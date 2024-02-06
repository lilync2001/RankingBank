import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from 'config/config';

let user = JSON.parse(localStorage.getItem('user') || '{}');
let token = user && user.token ? user.token : '';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-token': token,
  },
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private URL_RANKING: string = config.URL_API_BASE + 'credito/estado';

  data!: any[];

  constructor(private http: HttpClient) {}

  putEstadoCredito(id: number, tipo: string) {
    console.log('httpOptions => ', httpOptions);
    return this.http.put<any>(
      `${this.URL_RANKING}/${id}`,
      { estado: tipo },
      httpOptions
    );
  }
}
