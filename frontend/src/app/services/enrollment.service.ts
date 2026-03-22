import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/enrollments`);
  }

  enrollInCourse(courseId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/enrollments`, { courseId });
  }
}
