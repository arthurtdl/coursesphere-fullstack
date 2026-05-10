import api from "./api";
import type { Course } from "@/types/Course";

export const courseService = {
  // GET /api/v1/courses (Other users' courses)
  getExploreCourses: async (): Promise<Course[]> => {
    const { data } = await api.get("/courses");
    return data;
  },

  // GET /api/v1/courses/mine (My Courses)
  getMyCourses: async (): Promise<Course[]> => {
    const { data } = await api.get("/courses/mine");
    return data;
  },
};