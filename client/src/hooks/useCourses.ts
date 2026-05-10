import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/courseService";
import type { CourseFormValues } from "@/types/Course";
import { toast } from "sonner";

export function useExploreCourses() {
  return useQuery({
    queryKey: ["courses", "explore"],
    queryFn: courseService.getExploreCourses,
  });
}

export function useMyCourses() {
  return useQuery({
    queryKey: ["courses", "mine"],
    queryFn: courseService.getMyCourses,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CourseFormValues) => {
      return courseService.createCourse({
        name: data.name,
        description: data.description,
        status: data.status,
        start_date: data.startDate.toISOString(),
        end_date: data.endDate.toISOString(),
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
