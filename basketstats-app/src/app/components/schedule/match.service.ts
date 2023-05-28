import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Match } from "../../models/match";
import { MatchQuarterStatsSaveRequest } from "../../models/match-quarter-stats-save-request";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private baseApiUrl = `${environment.api.url}/match`;

  constructor(private http: HttpClient) { }

  getMatchList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }

  getMatchListByTeamId(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/team/${id}`);
  }

  getMatchListByLeagueId(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/league/${id}`);
  }

  getMatchById(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/${id}`);
  }

  getStatsOfMatch(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/stats/${id}`);
  }

  getSummaryStatsOfMatch(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/summary/${id}`);
  }

  getPlayersSummaryStatsOfMatch(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/playersSummary/${id}`);
  }

  getMatchListByLeagueIdForUser(id: number, userId: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/userMatches/${id}/${userId}`);
  }

  createMatch(match: Match): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/create`, match)
  }

  updateMatch(match: Match): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/update/${match.id}`, match);
  }

  deleteMatch(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/delete/${id}`);
  }

  getMatchQuartersCount(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/getMatchQuartersCount/${id}`);
  }

  saveMatchQuarterStats(request: MatchQuarterStatsSaveRequest): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/saveMatchQuarterStats`, request);
  }
}
