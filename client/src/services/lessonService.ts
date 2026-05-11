import api from "./api";
import type { Lesson, LessonFormValues } from "@/types/Lesson";

export const lessonService = {
  // POST /api/v1/lessons
  createLesson: async (courseId: number | string, data: LessonFormValues): Promise<Lesson> => {
    const response = await api.post(`/lessons`, {
      lesson: {
        name: data.name,
        description: data.description,
        video_url: data.video_url,
        status: data.status,
        course_id: courseId
      }
    });
    return response.data;
  },

  // PATCH /api/v1/lessons/:id
  updateLesson: async (lessonId: number | string, data: LessonFormValues): Promise<Lesson> => {
    const response = await api.put(`/lessons/${lessonId}`, {
      lesson: {
        name: data.name,
        description: data.description,
        video_url: data.video_url,
        status: data.status
      }
    });
    return response.data;
  },

  // DELETE /api/v1/lessons/:id
  deleteLesson: async (lessonId: number | string): Promise<void> => {
    await api.delete(`/lessons/${lessonId}`);
  }
};