
'use server';

import { answerNeighborhoodQuestion } from '@/ai/flows/answer-neighborhood-questions';
import { analyzeReport, AnalyzeReportOutput, analyzeAllReports, AllReportsAnalysisOutput } from '@/ai/flows/report-analysis-flow';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, updateDoc, doc, arrayUnion, getDocs, query, orderBy, increment, runTransaction } from 'firebase/firestore';

export async function askQuestion(question: string) {
  if (!question) {
    return { answer: 'Por favor, faça uma pergunta.' };
  }
  try {
    const result = await answerNeighborhoodQuestion({ question });
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { answer: 'Desculpe, não consegui encontrar uma resposta. Tente novamente mais tarde.' };
  }
}

type ReportData = {
    category: string;
    description: string;
    address: string;
    imageUrl?: string;
}

export async function submitReport(
    data: ReportData,
    userId: string
): Promise<AnalyzeReportOutput & { id: string }> {
    try {
        const analysis = await analyzeReport(data);
        
        const reportData = {
            ...data,
            analysis,
            userId,
            status: "Aberta",
            createdAt: serverTimestamp(),
            updates: [
                { status: "Aberta", date: new Date().toISOString(), comment: "Manifestação recebida e aguardando triagem para encaminhamento." }
            ],
            supporters: [],
            followers: [],
            comments: [],
        };
        
        const docRef = await addDoc(collection(db, "reports"), reportData);

        console.log('Manifestação registrada com o ID:', docRef.id);
        return { ...analysis, id: docRef.id };
    } catch (error) {
        console.error('Erro ao analisar e salvar a manifestação:', error);
        throw new Error('Falha ao processar a manifestação.');
    }
}

export async function addComment(reportId: string, text: string, user: { uid: string; displayName: string; photoURL: string | null }) {
    if (!reportId || !text || !user) {
        throw new Error("Dados inválidos para adicionar comentário.");
    }
    
    const commentData = {
        id: new Date().getTime().toString(), // simple unique id
        authorId: user.uid,
        author: user.displayName,
        avatarUrl: user.photoURL,
        text,
        createdAt: serverTimestamp(),
    };

    const reportRef = doc(db, "reports", reportId);

    try {
        await updateDoc(reportRef, {
            comments: arrayUnion(commentData)
        });
        console.log("Comentário adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
        throw new Error("Não foi possível adicionar o comentário.");
    }
}

export async function updateReportStatus(reportId: string, status: string, comment: string) {
    if (!reportId || !status || !comment) {
        throw new Error("Dados inválidos para atualizar o status.");
    }

    const updateData = {
        status,
        date: new Date().toISOString(),
        comment,
    };

    const reportRef = doc(db, "reports", reportId);

    try {
        await updateDoc(reportRef, {
            status: status,
            updates: arrayUnion(updateData)
        });
        console.log("Status da manifestação atualizado!");
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar o status:", error);
        throw new Error("Não foi possível atualizar o status da manifestação.");
    }
}

export async function getReportsAnalysis(): Promise<AllReportsAnalysisOutput> {
    try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reports = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (reports.length === 0) {
             return {
                overallSummary: "Nenhuma manifestação registrada para análise. O sistema está operacional, mas sem dados para processar.",
                keyInsights: ["Nenhum insight disponível devido à ausência de dados."],
                urgentActionItems: ["Nenhuma ação urgente necessária."],
            };
        }

        const analysis = await analyzeAllReports({ reports: JSON.stringify(reports) });
        return analysis;
    } catch (error) {
        console.error("Error getting reports analysis:", error);
        throw new Error("Failed to get reports analysis.");
    }
}


// Forum Actions
export async function createPost(
  data: { 
    title: string; 
    content: string; 
    poll?: { question: string; options: string[] };
  },
  user: { uid: string; displayName: string | null; photoURL: string | null }
) {
  if (!user) throw new Error("Usuário não autenticado.");

  const postData: any = {
    title: data.title,
    content: data.content,
    authorId: user.uid,
    authorName: user.displayName || "Anônimo",
    authorAvatar: user.photoURL,
    createdAt: serverTimestamp(),
    repliesCount: 0,
    comments: [],
  };

  if (data.poll && data.poll.question && data.poll.options.length >= 2) {
    postData.poll = {
        question: data.poll.question,
        options: data.poll.options.map((option, index) => ({
            id: index,
            text: option,
            votes: 0,
        })),
        voters: {}, // Map of userId -> optionId
    };
  }

  try {
    const docRef = await addDoc(collection(db, "posts"), postData);
    return { id: docRef.id, ...postData };
  } catch (error) {
    console.error("Erro ao criar o post:", error);
    throw new Error("Não foi possível criar o tópico.");
  }
}

export async function addCommentToPost(postId: string, text: string, user: { uid: string; displayName: string; photoURL: string | null }) {
    if (!postId || !text || !user) {
        throw new Error("Dados inválidos para adicionar comentário.");
    }
    
    const commentData = {
        id: new Date().getTime().toString(), // simple unique id
        authorId: user.uid,
        authorName: user.displayName,
        authorAvatar: user.photoURL,
        text,
        createdAt: serverTimestamp(),
    };

    const postRef = doc(db, "posts", postId);

    try {
        await updateDoc(postRef, {
            comments: arrayUnion(commentData),
            repliesCount: increment(1)
        });
        console.log("Comentário adicionado ao post com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar comentário ao post:", error);
        throw new Error("Não foi possível adicionar o comentário ao tópico.");
    }
}

export async function voteOnPoll(postId: string, optionId: number, userId: string) {
    if (!postId || !userId || optionId === undefined) {
        throw new Error("Dados inválidos para votar.");
    }

    const postRef = doc(db, "posts", postId);

    try {
        await runTransaction(db, async (transaction) => {
            const postDoc = await transaction.get(postRef);
            if (!postDoc.exists()) {
                throw new Error("Tópico não encontrado!");
            }
            if (!postDoc.data().poll) {
                throw new Error("Este tópico não possui uma enquete.");
            }

            const postData = postDoc.data();
            const poll = postData.poll;
            const voterPath = `poll.voters.${userId}`;

            if (poll.voters && poll.voters[userId] !== undefined) {
                throw new Error("Usuário já votou nesta enquete.");
            }

            const optionPath = `poll.options`;
            const newOptions = poll.options.map((opt: any) => 
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            );
            
            transaction.update(postRef, {
                [voterPath]: optionId,
                [optionPath]: newOptions
            });
        });

        console.log("Voto computado com sucesso!");
        return { success: true };
    } catch (error: any) {
        console.error("Erro ao votar na enquete:", error);
        throw new Error(error.message || "Não foi possível registrar o voto.");
    }
}

// Business Actions
export async function addReviewToBusiness(
  businessId: string, 
  review: { rating: number; comment: string },
  user: { uid: string; displayName: string | null; photoURL: string | null }
) {
  if (!businessId || !review || !user) {
    throw new Error("Dados inválidos para adicionar avaliação.");
  }
  
  // Note: Firestore does not support direct document access by numeric ID.
  // In a real scenario, businessId should be the Firestore document ID (string).
  // For this demo, we'll assume businessId is the string version of the numeric id.
  const businessRef = doc(db, "businesses", businessId);

  const reviewData = {
    id: new Date().getTime().toString(),
    authorId: user.uid,
    author: user.displayName || 'Anônimo',
    avatarUrl: user.photoURL,
    rating: review.rating,
    comment: review.comment,
    createdAt: serverTimestamp(),
  };

  try {
    // This is a simplified approach. A real app should use a transaction 
    // to check if the user has already reviewed and to update the average rating.
    await updateDoc(businessRef, {
      reviews: arrayUnion(reviewData),
      reviewsCount: increment(1)
    });
    console.log("Avaliação adicionada com sucesso!");
    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar avaliação:", error);
    throw new Error("Não foi possível adicionar a avaliação.");
  }
}
