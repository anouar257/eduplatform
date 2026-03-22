import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Lesson, Level, Subject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getCourses(filters?: { levelId?: string; subjectId?: string; search?: string }): Observable<Course[]> {
    const params = new URLSearchParams();
    if (filters?.levelId) params.append('levelId', filters.levelId);
    if (filters?.subjectId) params.append('subjectId', filters.subjectId);
    if (filters?.search) params.append('search', filters.search);
    
    const url = params.toString() ? `${this.apiUrl}/courses?${params}` : `${this.apiUrl}/courses`;
    return this.http.get<Course[]>(url);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/courses/${courseId}/lessons`);
  }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.apiUrl}/levels`);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  enrollInCourse(courseId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/enrollments`, { courseId });
  }
}
