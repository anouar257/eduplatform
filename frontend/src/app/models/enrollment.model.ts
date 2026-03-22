export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  progress: number;
}

export interface PlatformStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalLessons: number;
  totalExams: number;
  totalEnrollments: number;
  upcomingLiveSessions: number;
}
