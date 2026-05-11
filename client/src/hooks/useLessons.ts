import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonService } from "@/services/lessonService";
import type { LessonFormValues } from "@/types/Lesson";
import { toast } from "sonner";


export function useCreateLesson(courseId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LessonFormValues) => lessonService.createLesson(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId.toString()] });
      toast.success("Aula adicionada ao curso!");
    },
    onError: () => toast.error("Erro ao criar a aula.")
  });
}


export function useUpdateLesson(courseId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: LessonFormValues }) => 
      lessonService.updateLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId.toString()] });
      toast.success("Aula atualizada!");
    },
    onError: () => toast.error("Não foi possível salvar as alterações.")
  });
}


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