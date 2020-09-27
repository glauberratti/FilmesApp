import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T, updateT> {

  private BASE_API_URL = environment.BASE_API_URL;

  constructor(
    protected http: HttpClient
  ) { }

  getById(endPoint: string, id: number): Observable<T>{
    return this.http.get<T>(`${this.BASE_API_URL}/${endPoint}/${id}`);
  }

  getAll(endPoint: string): Observable<T[]>{
    return this.http.get<T[]>(`${this.BASE_API_URL}/${endPoint}`);
  }

  add(endPoint: string, record: T): Observable<object> {
    return this.http.post(`${this.BASE_API_URL}/${endPoint}`, record);
  }

  update(endPoint: string, record: updateT): Observable<object> {
    return this.http.put(`${this.BASE_API_URL}/${endPoint}`, record);
  }

  remove(endPoint: string, id: number): Observable<object> {
    return this.http.delete(`${this.BASE_API_URL}/${endPoint}/${id}`);
  }
}
