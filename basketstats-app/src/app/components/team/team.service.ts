import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Team } from "../../models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseApiUrl = `${environment.api.url}/team`;

  constructor(private http: HttpClient) { }

  getTeamList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/${id}`);
  }

  isTeamWithNameExisting(name: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/isTeamWithNameExisting/${name}`);
  }

  getTeamByLeagueId(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/leagueList/${id}`);
  }

  getAllPlayerAvgStatsByTeamId(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/playersAvgStats/${id}`);
  }

  createTeam(team: Team): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('logoFile', team.logoFile);
    formData.append('name', team.name);
    formData.append('logo', team.logo);
    formData.append('leagueId', team.league.id.toString());

    const req = new HttpRequest('POST', `${this.baseApiUrl}/create`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  updateTeam(id: number, team: Team): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('logoFile', team.logoFile);
    formData.append('name', team.name);
    formData.append('logo', team.logo);
    console.log(team.league);
    formData.append('leagueId', team.league.id.toString());

    const req = new HttpRequest('PUT', `${this.baseApiUrl}/update/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/delete/${id}`);
  }

  hasMatches(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/hasMatches/${id}`);
  }

  hasPlayers(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/hasMatches/${id}`);
  }
}
