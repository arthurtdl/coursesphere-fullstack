import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-indigo-600">Erro 404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-6 text-base leading-7 text-slate-600">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <div className="mt-10">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-xl px-8 font-bold transition-all">
          <Link to="/dashboard/explore">
            <Home className="mr-2 h-4 w-4" />
            Voltar para o Início
          </Link>
        </Button>
      </div>
    </div>
  );
}