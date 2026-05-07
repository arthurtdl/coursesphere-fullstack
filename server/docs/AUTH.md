## 🔐 Autenticação (JWT)

A API do **CourseSphere** utiliza **JSON Web Tokens (JWT)** para autenticação stateless.

Isso significa que o servidor não armazena sessões. A identidade do usuário é validada através de um token assinado enviado em cada requisição protegida.

---

### 1. Fluxo de Autenticação

O processo de autenticação funciona da seguinte forma:

1. O usuário envia suas credenciais para o endpoint de login
2. A API valida as credenciais
3. Um token JWT é retornado
4. O cliente armazena o token
5. O token é enviado em todas as requisições protegidas

---

### 2. Endpoint de Login

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Realiza autenticação do usuário e retorna um token JWT |

---

#### Exemplo de Requisição

**URL:** `http://localhost:3000/api/v1/auth/login`

**Body (JSON):**

```json
{
  "email": "usuario@cin.ufpe.br",
  "password": "sua_senha_aqui"
}
```

---

#### Resposta de Sucesso (`200 OK`)

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "John",
    "email": "john@cin.ufpe.br"
  }
}
```

---

### 3. Como utilizar o Token

Para acessar endpoints protegidos, o token deve ser enviado no header `Authorization` utilizando o padrão `Bearer`.

#### Exemplo de Header

```http
Authorization: Bearer <seu_token_aqui>
```

---

### 4. Regras e Validade

#### Expiração

O token expira automaticamente após **2 horas**.

Após esse período, um novo login deve ser realizado.

---