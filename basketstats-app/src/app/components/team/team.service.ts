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
    const formData = new FormData();
    crudResource.imageFile && formData.append('imageFile', crudResource.imageFile);
    crudResource.name && formData.append('name', crudResource.name);
    crudResource.imageName && formData.append('imageName', crudResource.imageName);
    crudResource.league && formData.append('leagueId', crudResource.league.id.toString());

    return this.http.post<Team>(
      this.fullResourceUrl,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      });
  }

  public override update(crudResource: Partial<Team>): Observable<Team> {
    const formData = new FormData();
    crudResource.imageFile && formData.append('logoFile', crudResource.imageFile);
    crudResource.name && formData.append('name', crudResource.name);
    crudResource.imageName && formData.append('logo', crudResource.imageName);
    crudResource.league && formData.append('leagueId', crudResource.league.id.toString());

    return this.http.put<Team>(
      `${this.fullResourceUrl}/${crudResource.id}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      });
  }

  public getLogoUrl(id: number): string {
    return `${this.fullResourceUrl}/logo/${id}`;
  }

  hasMatches(id: number): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/hasMatches/${id}`);
  }

  hasPlayers(id: number): Observable<any> {
    return this.http.get(`${this.fullResourceUrl}/hasMatches/${id}`);
  }
}
