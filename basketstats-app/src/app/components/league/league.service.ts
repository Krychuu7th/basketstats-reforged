import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { League } from "src/app/models/league.model";
import { BaseCrudService } from "src/app/shared/service/base-table/base-crud.service";
import { QueryParamsService } from "src/app/shared/service/query-params/query-params.service";

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseCrudService<League> {

  constructor(
    http: HttpClient,
    queryParamsService: QueryParamsService
  ) {
    super(
      http,
      queryParamsService,
      '/league'
    );
  }

  isLeagueWithNameExisting(name: string): Observable<Object> {
    return this.http.get(`${this.fullResourceUrl}/isLeagueWithNameExisting/${name}`);
  }

}
