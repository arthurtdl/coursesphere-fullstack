## 📹 CRUD de Aulas

O módulo de aulas representa o conteúdo programático de cada curso dentro do **CourseSphere**.

Cada aula é obrigatoriamente vinculada a um `Course` e as respostas são serializadas pelo `LessonRepresenter`, que inclui informações básicas do curso pai no JSON retornado pela API.

### Endpoints

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/lessons` | Lista todas as aulas. |
| `GET` | `/api/v1/lessons/:id` | Retorna os detalhes de uma aula específica. |
| `POST` | `/api/v1/lessons` | Cria uma nova aula vinculada a um curso. |
| `PATCH/PUT` | `/api/v1/lessons/:id` | Atualiza informações da aula. |
| `DELETE` | `/api/v1/lessons/:id` | Remove a aula do sistema. |

---

### Exemplo de Criação (POST)

**URL:** `http://localhost:3000/api/v1/lessons`

**Body (JSON):**

> **Importante:** Devido ao uso de *Strong Parameters*, os dados devem estar obrigatoriamente dentro da chave `"lesson"`.
>
> O campo `course_id` deve referenciar um curso existente no banco de dados.

```json
{
  "lesson": {
    "name": "Introdução ao Ruby on Rails",
    "description": "Nesta aula veremos a estrutura de pastas e o padrão MVC.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "status": "published",
    "course_id": 1
  }
}
```

---

### Exemplo de Resposta (201 Created)

O `LessonRepresenter` garante que o frontend receba também o contexto do curso associado.

```json
{
  "id": 1,
  "name": "Introdução ao Ruby on Rails",
  "description": "Nesta aula veremos a estrutura de pastas e o padrão MVC.",
  "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "status": "published",
  "course": {
    "id": 1,
    "name": "Ruby on Rails para Iniciantes"
  }
}
```

---

### Comandos de Teste (RSpec)

Para validar a integridade deste CRUD e dos relacionamentos, execute:

```bash
docker-compose exec server bundle exec rspec spec/requests/api/v1/lessons_spec.rb
```