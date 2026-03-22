import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveSession, JoinSessionResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LiveSessionsService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getLiveSessions(upcoming?: boolean): Observable<LiveSession[]> {
    const params = upcoming ? '?upcoming=true' : '';
    return this.http.get<LiveSession[]>(`${this.apiUrl}/live-sessions${params}`);
  }

  joinSession(sessionId: string): Observable<JoinSessionResponse> {
    return this.http.post<JoinSessionResponse>(`${this.apiUrl}/live-sessions/${sessionId}/join`, {});
  }
}
