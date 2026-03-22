import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlatformStats } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPlatformStats(): Observable<PlatformStats> {
    return this.http.get<PlatformStats>(`${this.apiUrl}/stats`);
  }
}
