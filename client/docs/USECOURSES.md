## 🛠️ Hooks de Consumo: `useCourses.ts`

Este módulo centraliza o consumo da API de cursos utilizando o **TanStack Query (v5)**.

Ele é responsável pelo gerenciamento de:

- Cache automático
- Revalidação de dados
- Sincronização entre Frontend e Backend
- Estados de loading e erro

---

## 📋 Hooks Disponíveis

### 1. `useExploreCourses`

Utilizado na aba **Explorar**.

Retorna todos os cursos publicados na plataforma, exceto aqueles cujo autor é o usuário autenticado (filtragem realizada no Backend via SQL).

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Query Key** | `["courses", "explore"]` |
| **Função** | `courseService.getExploreCourses` |

#### Comportamento

- Mantém cache automático
- Ideal para listagens públicas
- Reutiliza dados entre navegações

---

### 2. `useMyCourses`

Utilizado na aba **Meus Cursos**.

Retorna apenas os cursos pertencentes ao usuário autenticado.

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Query Key** | `["courses", "mine"]` |
| **Função** | `courseService.getMyCourses` |

#### Comportamento

- Revalida os dados automaticamente:
  - ao montar o componente
  - ao retornar foco para a janela da aplicação

---

### 3. `useCourse(id)`

Responsável por buscar os detalhes completos de um curso específico.

Retorna informações técnicas, descrição, categoria e demais dados associados ao curso selecionado.

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Query Key** | `["courses", id]` |
| **Função** | `courseService.getCourse` |
| **staleTime** | `5 minutos` |
| **enabled** | `!!id` |

#### Comportamento

- Executa apenas quando o `id` estiver definido
- Mantém cache individual por curso
- Evita requisições desnecessárias

---

## Mutations (Alteração de Dados)

As mutações são responsáveis pelo envio de dados ao backend e pela atualização automática do cache da aplicação.

---

### `useCreateCourse`

Responsável pela criação de novos cursos.

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida `["courses", "mine"]` |

#### Comportamento

- Atualiza automaticamente a listagem do autor
- Sincroniza os dados após criação

---

### `useUpdateCourse`

Responsável pela atualização de cursos existentes.

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida o prefixo global `["courses"]` |

#### Comportamento

- Atualiza:
  - listagens
  - detalhes individuais
  - cursos do usuário

---

### `useDeleteCourse`

Responsável pela remoção permanente de cursos.

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida `["courses", "mine"]` |

#### Comportamento

- Remove automaticamente o curso da interface
- Atualiza a listagem do usuário autenticado

---

## Nota Técnica

Os hooks de criação e atualização realizam automaticamente o tratamento de datas.

Objetos do tipo `Date` são convertidos para strings no formato ISO antes do envio ao backend, garantindo compatibilidade com a API Ruby on Rails.

---

## Exemplo de Implementação

Exemplo de uso combinado para listagem e criação de cursos:

```tsx
import {
  useExploreCourses,
  useCreateCourse,
} from "@/hooks/useCourses";

export function ExplorePage() {
  const { data: courses, isLoading } = useExploreCourses();

  const { mutate: createCourse } = useCreateCourse();

  if (isLoading) {
    return <p>Carregando cursos...</p>;
  }

  return (
    <div>
      <button onClick={() => createCourse(newCourseData)}>
        Novo Curso
      </button>

      <div className="grid">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}
```