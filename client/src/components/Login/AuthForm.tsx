"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import {
  Input,
  Button,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/index";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AuthForm() {
  const { login, loading: authLoading, register } = useAuth();
  const [tab, setTab] = useState("login");

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErr, setLoginErr] = useState<Record<string, string>>({});

  // Register States
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regErr, setRegErr] = useState<Record<string, string>>({});

  // Login logic with auth hook integration
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!loginEmail.includes("@")) errs.email = "Email inválido";
    if (loginPassword.length < 6) errs.password = "Mínimo 6 caracteres";

    setLoginErr(errs);
    if (Object.keys(errs).length) return;

    try {
      await login({ email: loginEmail, password: loginPassword });
      toast.success("Bem-vindo de volta!");
    } catch (error) {
      toast.error("Falha na autenticação. Verifique seus dados.");
      console.error("Login error:", error);
    }
  };

  // Register logic with auth hook integration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Nome é obrigatório";
    if (!regEmail.includes("@")) errs.email = "Email inválido";
    if (regPassword.length < 6) errs.password = "Mínimo 6 caracteres";
    if (confirmPassword !== regPassword)
      errs.confirmPassword = "As senhas não coincidem";

    setRegErr(errs);
    if (Object.keys(errs).length) return;

    try {
        await register({
            name,
            email: regEmail,
            password: regPassword,
            password_confirmation: confirmPassword
        });
        toast.success("Conta criada com sucesso!");
    } catch (error) {
        toast.error("Falha no registro. Verifique seus dados.");
        console.error("Register error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {tab === "login" ? "Acesse sua conta" : "Comece sua jornada"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {tab === "login"
            ? "Continue de onde parou seus estudos."
            : "Crie sua conta e explore os cursos disponíveis."}
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex flex-col">
          <TabsList>
            <TabsTrigger
              value="login"
              className="data-[state=active]:shadow-sm"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:shadow-sm"
            >
              Criar Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="login"
            className="mt-6 animate-in fade-in-50 duration-300"
          >
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={
                    loginErr.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {loginErr.email && (
                  <p className="text-xs text-destructive animate-in slide-in-from-top-1">
                    {loginErr.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={
                    loginErr.password
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {loginErr.password && (
                  <p className="text-xs text-destructive animate-in slide-in-from-top-1">
                    {loginErr.password}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full shadow-elegant cursor-pointer"
                disabled={authLoading}
              >
                {authLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="register"
            className="mt-6 animate-in fade-in-50 duration-300"
          >
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {regErr.name && (
                  <p className="text-xs text-destructive">{regErr.name}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                {regErr.email && (
                  <p className="text-xs text-destructive">{regErr.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-pass">Senha</Label>
                <Input
                  id="reg-pass"
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="conf-pass">Confirmar</Label>
                <Input
                  id="conf-pass"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {(regErr.password || regErr.confirmPassword) && (
                <p className="text-xs text-destructive">
                  {regErr.password || regErr.confirmPassword}
                </p>
              )}
              <Button
                type="submit"
                className="w-full shadow-elegant cursor-pointer"
                disabled={authLoading}
              >
                Criar conta
              </Button>
            </form>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
