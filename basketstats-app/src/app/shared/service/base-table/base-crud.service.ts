import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCrudResource } from '../../model/base-crud-resource.model';
import { Page } from '../../model/pageable';
import { QueryParams } from '../../model/query-params';
import { QueryParamsService } from '../query-params/query-params.service';

export abstract class BaseCrudService<T extends BaseCrudResource> {

  constructor(
    protected http: HttpClient,
    protected queryParamsService: QueryParamsService,
    protected resourceUrl: string
  ) { }

  public create(crudResource: Partial<T>): Observable<T> {
    return this.http.post<T>(this.fullResourceUrl, crudResource);
  }

  public get(queryParams: QueryParams): Observable<Page<T>> {
    return this.http.get<Page<T>>(
      this.fullResourceUrl,
      {
        params: this.queryParamsService.buildHttpParams(queryParams)
      }
    );
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.fullResourceUrl}/get-all`);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.fullResourceUrl}/${id}`);
  }

  public update(crudResource: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.fullResourceUrl}/${crudResource.id}`, crudResource);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.fullResourceUrl}/${id}`);
  }

  protected get fullResourceUrl(): string {
    return `${environment.api.url}${this.resourceUrl}`;
  }
}
