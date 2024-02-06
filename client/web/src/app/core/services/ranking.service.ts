import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private URL_RANKING: string = config.URL_API_BASE + '/ranking';
  private URL_FILE: string = config.URL_API_BASE + 'csv';

  data!: any[];

  constructor(private http: HttpClient) {}

  getRanking() {
    return this.http.get<any>(this.URL_RANKING, {
      withCredentials: true,
    });
  }

  postRanking(file: any) {
    return this.http.post<any>(this.URL_FILE, file, {
      withCredentials: true,
    });
  }
}
