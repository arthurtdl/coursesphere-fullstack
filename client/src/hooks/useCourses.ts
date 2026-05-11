import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/courseService";
import type { CourseFormValues, CreateCourse } from "@/types/Course";
import { toast } from "sonner";


export function useCourse(id: number | string | undefined) {
  return useQuery({
    queryKey: ["courses", id?.toString()],
    queryFn: () => courseService.getCourseDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}


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

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CourseFormValues }) => {
      const payload: CreateCourse = {
        name: data.name,
        description: data.description,
        status: data.status,
        start_date: data.startDate.toISOString(),
        end_date: data.endDate.toISOString(),
      };
      return courseService.updateCourse(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso atualizado com sucesso!");
    },
    onError: () => toast.error("Erro ao atualizar curso."),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", "mine"] });
      toast.success("Curso removido com sucesso!");
    },
    onError: () => toast.error("Erro ao excluir o curso."),
  });
}
