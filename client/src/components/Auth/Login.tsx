import { AuthForm } from "./AuthForm";
import { CourseSphere } from "../Logo/CourseSphere";

export function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 w-full overflow-hidden">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-16 text-white bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-800">

        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <CourseSphere />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">
            Gestão de cursos, <br />
            <span className="text-indigo-200">sem esforço.</span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100/80 leading-relaxed font-light">
            Organize, publique e acompanhe sua jornada educacional com a
            elegância que o seu conteúdo merece.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-4 text-xs font-medium tracking-widest uppercase text-indigo-300/50">
          <span className="h-px w-8 bg-indigo-300/20" />© 2026 CourseSphere Labs
        </div>
      </div>

      {/* Right Panel - AuthForm */}
      <div className="flex items-center justify-center bg-background px-8 py-12 translate-y-20 ">
        <AuthForm />
      </div>
    </div>
  );
}
