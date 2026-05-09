import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Sparkles, Compass, LayoutGrid } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navLinks = [
  { to: "/dashboard/explore", label: "Explorar", icon: Compass },
  { to: "/dashboard/my-courses", label: "Meus Cursos", icon: LayoutGrid },
] as const;

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada");
    navigate("/login", { replace: true });
  };

  // Get the first name from the user's full name
  const firstName = user?.name?.split(" ")[0] || "Usuário";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm text-slate-100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Logo and Main Nav */}
        <div className="flex items-center gap-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">CourseSphere</span>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-slate-800 text-white shadow-sm" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
                    {label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-4.25 h-0.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: User Profile and Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end sm:flex">
            <p className="text-xs text-slate-500">Bem-vindo,</p>
            <p className="text-sm font-semibold text-slate-200">{firstName}</p>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-slate-400 hover:bg-red-700/10 hover:text-indigo-700 cursor-pointer"
          >
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}