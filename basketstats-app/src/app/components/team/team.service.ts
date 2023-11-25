import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Page } from "src/app/shared/model/pageable";
import { QueryParams } from "src/app/shared/model/query-params";
import { BaseCrudService } from "src/app/shared/service/base-table/base-crud.service";
import { QueryParamsService } from "src/app/shared/service/query-params/query-params.service";
import { Team } from "../../models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseCrudService<Team> {

  constructor(
    http: HttpClient,
    queryParamsService: QueryParamsService
  ) {
    super(
      http,
      queryParamsService,
      '/team'
    );
  }

  public getForLeague(leagueId: number, queryParams: QueryParams): Observable<Page<Team>> {
    return this.http.get<Page<Team>>(
      `${this.fullResourceUrl}/league-id/${leagueId}`,
      {
        params: this.queryParamsService.buildHttpParams(queryParams)
      }
    );
  }

  isTeamWithNameExisting(name: string): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/isTeamWithNameExisting/${name}`);
  }

  getAllPlayerAvgStatsByTeamId(id: number): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/playersAvgStats/${id}`);
  }

  public override create(crudResource: Partial<Team>): Observable<Team> {
    const formData = this.buildFormData(crudResource);

    return this.http.post<Team>(
      this.fullResourceUrl,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      });
  }

  public override update(crudResource: Partial<Team>): Observable<Team> {
    const formData = this.buildFormData(crudResource);

    return this.http.put<Team>(
      `${this.fullResourceUrl}/${crudResource.id}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      });
  }

  hasMatches(id: number): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/hasMatches/${id}`);
  }

  hasPlayers(id: number): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/hasMatches/${id}`);
  }

  private buildFormData(crudResource: Partial<Team>): FormData {
    const formData = new FormData();
    crudResource.file?.fileContent && formData.append('fileContent', crudResource.file.fileContent);
    crudResource.name && formData.append('name', crudResource.name);
    crudResource.file?.fileName && formData.append('fileName', crudResource.file.fileName);
    crudResource.league && formData.append('leagueId', crudResource.league.id.toString());
    crudResource.id && formData.append('id', crudResource.id.toString());

    return formData;
  }
}
