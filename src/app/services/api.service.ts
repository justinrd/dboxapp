import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
const apiKey = environment.key;

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(serviceName: string, payload: string, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${apiUrl}/${serviceName}?api_key=${apiKey}&${payload}`;

    return this.http.get<T>(url, options)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  post<T>(serviceName: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${apiUrl}/${serviceName}?api_key=${apiKey}&${body}`;

    return this.http.post<T>(url, body, options)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  postPhoto<T>(serviceName: string, body: any, payload: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const url = `${apiUrl}/${serviceName}?api_key=${apiKey}&${payload}`;

    return this.http.post<T>(url, body, options)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }


  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(error); 
  }
}
