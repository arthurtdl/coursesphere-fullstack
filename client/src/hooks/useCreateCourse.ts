import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/courseService";
import type { CreateCourse } from "@/types/Course";
import { toast } from "sonner";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourse) => {
      return courseService.createCourse({
        name: data.name,
        description: data.description,
        status: data.status,
        start_date: data.start_date.toString(),
        end_date: data.end_date.toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", "mine"] });
      toast.success("Curso criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar curso. Tente novamente.");
    },
  });
}