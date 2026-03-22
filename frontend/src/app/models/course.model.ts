export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  isFree: boolean;
  levelId?: string;
  subjectId?: string;
  teacherId: string;
  levelName?: string;
  subjectName?: string;
  teacherName: string;
  lessonCount: number;
  enrollmentCount: number;
  rating?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'pdf' | 'summary' | 'quiz';
  videoUrl?: string;
  pdfUrl?: string;
  content?: string;
  duration?: number;
  order: number;
  isFree: boolean;
}

export interface Level {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}
