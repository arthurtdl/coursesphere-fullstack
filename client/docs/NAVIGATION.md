## Navegação e Fluxo de Rotas

Esta documentação descreve como a navegação está estruturada no CourseSphere, utilizando o `react-router-dom`.

## Estratégia de Roteamento
O sistema utiliza o `createBrowserRouter` para definir rotas declarativas. A navegação é dividida em duas categorias principais: **Rotas Públicas** e **Rotas Protegidas**.

### Estrutura das Rotas
1. **Raiz (`/`)**: Redireciona automaticamente para o `/dashboard`.
2. **Login (`/login`)**: Página de entrada contendo o formulário de autenticação (Login e Registro).
3. **Dashboard (`/dashboard`)**: Área principal do sistema, acessível apenas por usuários autenticados.
4. **404 (`*`)**: Captura qualquer rota inexistente.

## Proteção de Rotas
A segurança de acesso é gerenciada pelo componente `ProtectedRoute`.

- **Mecânica**: O componente verifica o estado `isAuthenticated` do `AuthContext`.
- **Fluxo de Bloqueio**: Se um usuário não autenticado tentar acessar uma rota filha do `ProtectedRoute`, ele é redirecionado via `<Navigate to="/login" replace />`.
- **Persistência**: Enquanto o sistema verifica o token no `localStorage`, o estado `loading` é ativado para evitar renderizações indevidas.

## Fluxo de Navegação Programática
Após operações bem-sucedidas no `AuthForm` (Login ou Registro), utilizamos o hook `useNavigate` para redirecionar o usuário:

```typescript
navigate('/dashboard', { replace: true });
```
---