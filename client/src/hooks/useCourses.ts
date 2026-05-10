import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/courseService";

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