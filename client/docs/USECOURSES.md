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

## 🚀 Exemplo de Implementação

Exemplo de uso em componentes como `ExplorePage`:

```tsx
import { useExploreCourses } from "@/hooks/useCourses";

export function CourseList() {
  const { data: courses, isLoading, error } = useExploreCourses();

  if (isLoading) return <SkeletonGrid />;
  if (error) return <ErrorMessage />;

  return (
    <div className="grid">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```