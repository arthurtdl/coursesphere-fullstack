export type LessonStatus = "draft" | "published";

export interface Lesson {
  id: number;
  name: string;
  description: string;
  video_url: string | null;
  status: LessonStatus;
  course: {
    id: number;
    name: string;
  };
}

export interface LessonFormValues {
  name: string;
  description: string;
  video_url?: string;
  status: LessonStatus;
}