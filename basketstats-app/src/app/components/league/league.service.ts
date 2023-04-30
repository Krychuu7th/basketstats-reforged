import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { Observable } from "rxjs";
import { League } from "src/app/models/league.model";
import { Page } from "src/app/models/shared/pageable";
import { QueryParams } from "src/app/models/shared/query-params";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private baseApiUrl = `${environment.api.url}/league`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getLeagues(queryParams: QueryParams): Observable<Page<League>> {
    return this.http.get<Page<League>>(`${this.baseApiUrl}/list`);
  }

  getAllLeagues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/get-all`);
  }

  isLeagueWithNameExisting(name: string): Observable<Object> {
    return this.http.get(`${this.baseApiUrl}/isLeagueWithNameExisting/${name}`);
  }

  createLeague(league: Object): Observable<Object> {
    return this.http.post(`${this.baseApiUrl}/create`, league);
  }

  updateLeague(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseApiUrl}/update/${id}`, value);
  }

  deleteLeague(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/delete/${id}`);
  }

}
