'use client';

import MainLayout from "@/components/main-layout";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Bell, CreditCard, LogOut, ChevronRight, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <MainLayout headerTitle="Perfil">
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </MainLayout>
        );
    }

    if (!user) {
        return (
            <MainLayout headerTitle="Perfil">
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                    <div className="p-4 bg-muted rounded-full">
                        <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-bold">Acesse sua conta</h2>
                    <p className="text-muted-foreground">Faça login para ver seu perfil e gerenciar suas preferências.</p>
                    <Button onClick={() => auth.signInWithRedirect(new (require('firebase/auth').GoogleAuthProvider)())}>
                        Fazer Login
                    </Button>
                </div>
            </MainLayout>
        );
    }

    const menuItems = [
        { icon: Shield, label: "Segurança e Privacidade", description: "Senha, 2 fatores, permissões" },
        { icon: Bell, label: "Notificações", description: "Configurações de alerta e e-mail" },
        { icon: CreditCard, label: "Pagamentos", description: "Métodos salvos e histórico" },
        { icon: Settings, label: "Preferências", description: "Idioma, tema, acessibilidade" },
    ];

    return (
        <MainLayout headerTitle="Meu Perfil">
            <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
                {/* Header Perfil */}
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="text-2xl">{user.displayName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <h1 className="text-3xl font-bold font-headline">{user.displayName}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                        <div className="pt-2">
                             <Button variant="outline" size="sm" className="rounded-full">Editar Perfil</Button>
                        </div>
                    </div>
                </div>

                {/* Grid de Opções */}
                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Configurações da Conta</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {menuItems.map((item, index) => (
                                <button key={index} className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-t first:border-0 group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Button variant="destructive" className="w-full py-6 rounded-2xl font-bold" onClick={() => signOut(auth)}>
                        <LogOut className="mr-2 h-5 w-5" />
                        Sair da Conta
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}