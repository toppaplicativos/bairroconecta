
'use server';

import { answerNeighborhoodQuestion } from '@/ai/flows/answer-neighborhood-questions';
import { analyzeReport, AnalyzeReportOutput, analyzeAllReports, AllReportsAnalysisOutput } from '@/ai/flows/report-analysis-flow';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, updateDoc, doc, arrayUnion, getDocs, query, orderBy } from 'firebase/firestore';

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

        const analysis = await analyzeAllReports({ reports: JSON.stringify(reports) });
        return analysis;
    } catch (error) {
        console.error("Error getting reports analysis:", error);
        throw new Error("Failed to get reports analysis.");
    }
}


// Forum Actions
export async function createPost(
  data: { title: string; content: string },
  user: { uid: string; displayName: string | null; photoURL: string | null }
) {
  if (!user) throw new Error("Usuário não autenticado.");

  const postData = {
    title: data.title,
    content: data.content,
    authorId: user.uid,
    authorName: user.displayName || "Anônimo",
    authorAvatar: user.photoURL,
    createdAt: serverTimestamp(),
    repliesCount: 0,
  };

  try {
    const docRef = await addDoc(collection(db, "posts"), postData);
    return { id: docRef.id, ...postData };
  } catch (error) {
    console.error("Erro ao criar o post:", error);
    throw new Error("Não foi possível criar o tópico.");
  }
}
