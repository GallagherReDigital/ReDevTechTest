import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SanctionedEntity } from '../models/sanctioned-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanctionedEntitiesService {

  private readonly apiUrl: string;
  private readonly path = 'sanctioned-entities'

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/';
  }

  public getSanctionedEntities(): Observable<SanctionedEntity[]> {
    const url = this.apiUrl + this.path;
    return this.http.get<SanctionedEntity[]>(url);
  }

  public getSanctionedEntitiesCount(): Observable<number> {
    const url = `${this.apiUrl}${this.path}/count`;
    return this.http.get<number>(url);
  }

  public updateSanctionedEntitiesCount(count: number): Observable<number> {
    const url = `${this.apiUrl}${this.path}/new-count/${count}`;
    return this.http.post<number>(url, count, this.httpOptions);
  }
}
