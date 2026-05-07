## 📚 CRUD de Cursos

O módulo de cursos é o núcleo do **CourseSphere**, permitindo que instrutores gerenciem seus conteúdos.

Cada curso é obrigatoriamente vinculado a um autor (`User`) e as respostas são serializadas pelo `CourseRepresenter`, que inclui informações básicas do autor no JSON retornado pela API.

### Endpoints

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/courses` | Lista todos os cursos. |
| `GET` | `/api/v1/courses/:id` | Retorna os detalhes de um curso específico. |
| `POST` | `/api/v1/courses` | Cria um novo curso vinculado a um autor. |
| `PATCH/PUT` | `/api/v1/courses/:id` | Atualiza informações do curso. |
| `DELETE` | `/api/v1/courses/:id` | Remove o curso do sistema. |

---

### Exemplo de Criação (POST)

**URL:** `http://localhost:3000/api/v1/courses`

**Body (JSON):**

> **Importante:** Devido ao uso de *Strong Parameters*, os dados devem estar obrigatoriamente dentro da chave `"course"`.
>
> O campo `author_id` deve referenciar um usuário existente.

```json
{
  "course": {
    "name": "Ruby on Rails for Beginners",
    "description": "Learn how to build robust APIs from scratch.",
    "start_date": "2026-06-01T09:00:00",
    "end_date": "2026-12-01T18:00:00",
    "status": "published",
    "author_id": 1
  }
}
```

---

### Comandos de Teste (RSpec)

Para validar a integridade deste CRUD e dos relacionamentos, execute:

```bash
docker-compose exec server bundle exec rspec spec/requests/api/v1/courses_spec.rb
```