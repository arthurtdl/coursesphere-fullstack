## 👥 CRUD de Usuários

O módulo de usuários é responsável pelo cadastro e gestão dos perfis no **CourseSphere**. A autenticação é baseada em `bcrypt` e as respostas são filtradas pelo `UserRepresenter`.

### Endpoints

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/v1/users` | Cria um novo usuário. |
| `GET` | `/api/v1/users/:id` | Retorna os dados de um usuário específico. |
| `PATCH/PUT` | `/api/v1/users/:id` | Atualiza informações do usuário. |
| `DELETE` | `/api/v1/users/:id` | Remove o usuário do sistema. |

---

### Exemplo de Criação (POST)

**URL:** `http://localhost:3000/api/v1/users`
**Body (JSON):**

> **Importante:** Devido ao uso de *Strong Parameters*, os dados devem estar obrigatoriamente dentro da chave `"user"`.

```json
{
  "user": {
    "name": "Arthur",
    "email": "atl@cin.ufpe.br",
    "password": "password123",
    "password_confirmation": "password123"
  }
}
```

### Comandos de Teste (RSpec)

Para validar a integridade deste CRUD, execute:

```bash
docker-compose exec server bundle exec rspec spec/requests/api/v1/users_spec.rb
```