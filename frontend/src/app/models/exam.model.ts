export interface Exam {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  totalMarks: number;
  passingMarks: number;
  questionCount: number;
  scheduledAt?: string;
  levelName?: string;
  subjectName?: string;
}

export interface ExamQuestion {
  id: string;
  examId: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer?: string;
  marks: number;
  order: number;
}

export interface ExamAnswer {
  questionId: string;
  answer: string;
}

export interface ExamSubmission {
  answers: ExamAnswer[];
}

export interface ExamResult {
  score: number;
  percentage: number;
  passed: boolean;
  totalMarks: number;
  obtainedMarks: number;
}
