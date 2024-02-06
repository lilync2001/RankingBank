import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private destroy$ = new Subject<any>();

  private URL_API = config.URL_API_BASE + 'auth/login';

  constructor(private http: HttpClient) {}

  postLogin(data: any) {
    return this.http.post(this.URL_API, data);
  }
}
