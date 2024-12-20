import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  constructor(protected readonly url: string, protected readonly http: HttpClient) {}

  public findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  public create(body: T): Observable<T> {
    return this.http.post<T>(this.url, body);
  }
}
