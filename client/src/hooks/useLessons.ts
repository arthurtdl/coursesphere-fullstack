import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lessonService";
import type { LessonFormValues, LessonPayload } from "@/types/Lesson";
import { toast } from "sonner";


export const useCreateLesson = (courseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LessonFormValues & { course_id: string | number }) => {
      const payload: LessonPayload = {
        lesson: data
      };
      return api.post("/lessons", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId.toString()] });
      toast.success("Aula criada com sucesso!");
    },
    onError: () => {
      toast.error("Não foi possível criar a aula.");
    }
  });
};

export const useUpdateLesson = (courseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LessonFormValues }) => {
      const payload = { lesson: data };
      return api.patch(`/lessons/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId.toString()] });
      toast.success("Alterações salvas!");
    },
    onError: () => {
      toast.error("Não foi possível salvar as alterações.");
    }
  });
};


export function useDeleteLesson(courseId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: number | string) => lessonService.deleteLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId.toString()] });
      toast.success("Aula removida com sucesso.");
    },
    onError: () => toast.error("Erro ao excluir a aula.")
  });
}