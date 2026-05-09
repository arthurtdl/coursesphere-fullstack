"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Input, Button, Label, Tabs, TabsContent, TabsList, TabsTrigger} from "../index";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export function AuthForm() {
  const { login, loading: authLoading, register } = useAuth();
  const navigate = useNavigate();
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
      navigate('/dashboard/explore', { replace: true });
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

      <Tabs value={tab} onValueChange={setTab} className="flex w-full flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="rounded-md cursor-pointer text-black transition-all
                data-[state=active]:bg-white
                data-[state=active]:text-black
                  data-[state=active]:shadow-md">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-md cursor-pointer text-black transition-all
                data-[state=active]:bg-white
                data-[state=active]:text-black
                  data-[state=active]:shadow-md">Criar Conta</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6 min-h-105 animate-in fade-in-50 duration-300">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={`w-full bg-white border border-gray-200 shadow-md ${loginErr.email? "border-destructive focus-visible:ring-destructive" : ""}`}/>
                {loginErr.email && (
                  <p className="text-xs text-destructive animate-in slide-in-from-top-1">
                    {loginErr.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Senha
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline cursor-pointer">
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`w-full bg-white border border-gray-200 shadow-md ${loginErr.password? "border-destructive focus-visible:ring-destructive" : ""}`}/>
                {loginErr.password && (
                  <p className="text-xs text-destructive animate-in slide-in-from-top-1">
                    {loginErr.password}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full shadow-elegant cursor-pointer"
                disabled={authLoading}>
                {authLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="register"
            className="mt-6 min-h-105 animate-in fade-in-50 duration-300">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-gray-700">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-200 shadow-md"
                />
                {regErr.name && (
                  <p className="text-xs text-destructive">{regErr.name}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-gray-700">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 shadow-md"
                />
                {regErr.email && (
                  <p className="text-xs text-destructive">{regErr.email}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-pass" className="text-gray-700">Senha</Label>
                <Input
                  id="reg-pass"
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 shadow-md"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="conf-pass" className="text-gray-700">Confirmar</Label>
                <Input
                  id="conf-pass"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 shadow-md"
                />
              </div>
              {(regErr.password || regErr.confirmPassword) && (
                <p className="text-xs text-destructive">{regErr.password || regErr.confirmPassword}</p>
              )}
              <Button
                type="submit"
                className="w-full shadow-elegant cursor-pointer"
                disabled={authLoading}>
                Criar conta
              </Button>
            </form>
          </TabsContent>
      </Tabs>
    </div>
  );
}
