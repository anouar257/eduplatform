import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam, ExamQuestion, ExamSubmission, ExamResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getExams(filters?: { levelId?: string; subjectId?: string }): Observable<Exam[]> {
    const params = new URLSearchParams();
    if (filters?.levelId) params.append('levelId', filters.levelId);
    if (filters?.subjectId) params.append('subjectId', filters.subjectId);
    
    const url = params.toString() ? `${this.apiUrl}/exams?${params}` : `${this.apiUrl}/exams`;
    return this.http.get<Exam[]>(url);
  }

  getExamById(id: string): Observable<Exam> {
    return this.http.get<Exam>(`${this.apiUrl}/exams/${id}`);
  }

  getExamQuestions(examId: string): Observable<ExamQuestion[]> {
    return this.http.get<ExamQuestion[]>(`${this.apiUrl}/exams/${examId}/questions`);
  }

  submitExam(examId: string, submission: ExamSubmission): Observable<ExamResult> {
    return this.http.post<ExamResult>(`${this.apiUrl}/exams/${examId}/submit`, submission);
  }
}
