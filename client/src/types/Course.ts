export type CourseStatus = 'draft' | 'published';

export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  status: CourseStatus;
  start_date: string;
  end_date: string;
  author: Author;
}