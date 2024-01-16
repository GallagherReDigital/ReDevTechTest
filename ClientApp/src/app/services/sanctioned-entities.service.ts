import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SanctionedEntity } from '../models/sanctioned-entity';
import { Observable, catchError, throwError } from 'rxjs';

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

  private handleErrorResponse(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public addSanctionedEntity(entity: SanctionedEntity): Observable<SanctionedEntity> {
    const url = this.apiUrl + this.path;
    return this.http.post<SanctionedEntity>(url, entity, this.httpOptions)
      .pipe(catchError(this.handleErrorResponse));
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
