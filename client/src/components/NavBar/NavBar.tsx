import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CourseSphere } from "../Logo/CourseSphere";
import { toast } from "sonner";

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Definição dos links baseada nas sub-rotas que você criou
  const navLinks = [
    { to: "/dashboard/explore", label: "Explorar" },
    { to: "/dashboard/my-courses", label: "Meus Cursos" },
  ];

  // 2. Lógica de saída
  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada");
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      {/* Logo */}
      <CourseSphere />

      {/* Links de navegação usando NavLink para detectar rota ativa */}
      <ul>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? "font-bold border-b-2" : ""
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Exibição do nome do usuário vindo do contexto */}
      <div>
        <span>Olá, {user?.name}</span>
      </div>

      {/* Ação de Logout */}
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
}
