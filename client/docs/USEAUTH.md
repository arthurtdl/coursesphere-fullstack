## 🔐 Hook de Autenticação: `useAuth.ts`

O hook `useAuth` é o ponto central para acessar o estado global de autenticação da aplicação **Coursesphere**.  
Ele abstrai o consumo do `AuthContext`, garantindo que os dados do usuário e métodos de sessão estejam disponíveis em qualquer componente funcional.


Ele é responsável por fornecer:

- Dados do usuário autenticado.
- Métodos de login e logout.
- Verificação de permissões e estados de sessão.

---

## Validação de Contexto

Diferente de hooks de estado simples, o `useAuth` possui uma guarda de segurança interna.

## ⚠️ Erro de Escopo

O hook lança uma exceção (`Error`) caso seja utilizado fora de um `<AuthProvider />`.

Isso evita falhas silenciosas e garante que o contexto sempre estará definido ao ser acessado.

---

## 🚀 Exemplo de Uso

Utilize este hook sempre que precisar acessar informações do perfil ou realizar ações de autenticação:

```tsx
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <span>Olá, {user.name}</span>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <button>Fazer Login</button>
      )}
    </nav>
  );
}
```