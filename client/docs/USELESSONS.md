## 🛠️ Hooks de Consumo: `useLessons.ts`

Este módulo centraliza o gerenciamento das aulas vinculadas aos cursos da plataforma utilizando o **TanStack Query (v5)**.

Ele é responsável pelo gerenciamento de:

- Sincronização entre Frontend e Backend
- Invalidação inteligente de cache
- Atualização automática da interface
- Feedback visual de operações via Toasts

---

## 📋 Hooks Disponíveis

As mutações deste módulo são vinculadas a um `courseId` específico.

Isso garante que, ao alterar uma aula, apenas os dados do curso relacionado sejam invalidados e recarregados, otimizando a performance da aplicação.

---

## Mutations (Alteração de Dados)

### `useCreateLesson`

Responsável pela criação de novas aulas dentro de um curso.

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Escopo de Cache** | `["courses", courseId]` |
| **Payload** | `{ lesson: data }` |

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida `["courses", courseId]` |

#### Comportamento

- Adiciona a aula ao curso atual
- Atualiza automaticamente os dados do curso
- Dispara feedback visual de sucesso
- Encapsula os dados antes do envio ao backend

---

### `useUpdateLesson`

Responsável pela atualização de aulas existentes.

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Escopo de Cache** | `["courses", courseId]` |

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida `["courses", courseId]` |

#### Comportamento

- Atualiza:
  - título
  - descrição
  - conteúdo
  - metadados da aula
- Recarrega automaticamente as informações do curso
- Mantém a interface sincronizada em tempo real

---

### `useDeleteLesson`

Responsável pela remoção permanente de aulas.

#### Configuração

| Propriedade | Valor |
| :--- | :--- |
| **Escopo de Cache** | `["courses", courseId]` |

#### Estratégia de Cache

| Ação | Comportamento |
| :--- | :--- |
| **onSuccess** | Invalida `["courses", courseId]` |

#### Comportamento

- Remove a aula do banco de dados
- Atualiza automaticamente a estrutura do curso
- Remove a aula da listagem visual imediatamente

---

## Nota Técnica

Todos os hooks deste módulo exigem a passagem do `courseId` durante sua inicialização.

Isso é necessário para que o TanStack Query consiga identificar exatamente qual chave de cache deve ser invalidada após uma operação bem-sucedida.

### Exemplo de chave invalidada

```ts
["courses", "123"]
```

---

## Exemplo de Implementação

Exemplo de uso em um formulário/modal de criação de aulas:

```tsx
import { useCreateLesson } from "@/hooks/useLessons";

export function CreateLessonForm({ courseId }) {
  const {
    mutate: createLesson,
    isPending,
  } = useCreateLesson(courseId);

  const handleSubmit = (data) => {
    createLesson(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}

      <button disabled={isPending}>
        {isPending
          ? "Criando..."
          : "Adicionar Aula"}
      </button>
    </form>
  );
}
```