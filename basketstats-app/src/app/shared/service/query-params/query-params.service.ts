import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryParams } from '../../model/query-params';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  constructor() { }

  public buildHttpParams(queryParams: QueryParams): HttpParams {
    queryParams = queryParams ?? this.getDefaultQueryParams();
    let httpParams = new HttpParams();

    if (queryParams.pagination) {
      httpParams = httpParams.set('page', queryParams.pagination.page);
      httpParams = httpParams.set('size', queryParams.pagination.size);
    }
    if (queryParams.sort) {
      httpParams = httpParams.set('sort', `${queryParams.sort.name},${queryParams.sort.direction ?? 'asc'}`);
    }
    if (!!queryParams.params) {
      for (let param of queryParams.params) {
        httpParams = httpParams.set(param.key, param.value);
      }
    }

    return httpParams;
  }

  private getDefaultQueryParams(): QueryParams {
    return {
      pagination: {
        page: 0,
        size: 10,
      },
      params: []
    };
  }
}
