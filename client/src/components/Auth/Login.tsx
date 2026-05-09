import { AuthForm } from "./AuthForm";
import { CourseSphere } from "../Logo/CourseSphere";

export function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 w-full overflow-hidden">
      {/* Left Panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 text-white bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-800"
      >
        {/* Logo */}
        <div className="z-10">
          <CourseSphere />
        </div>

        {/* Hero */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            A plataforma minimalista para gestão de cursos.
          </h1>
          <p className="mt-4 text-lg text-blue-100/80">
            Organize, publique e acompanhe seus cursos e aulas em um único lugar
            com a elegância de um design system bem feito.
          </p>
        </div>

        {/* Footer */}
        <div className="z-10 text-sm text-blue-200/50">
          © 2026 CourseSphere Labs
        </div>
      </div>

      {/* Right Panel - AuthForm */}
      <div className="flex items-center justify-center bg-background px-8 py-12 translate-y-20 ">
        <AuthForm />
      </div>
    </div>
  );
}
