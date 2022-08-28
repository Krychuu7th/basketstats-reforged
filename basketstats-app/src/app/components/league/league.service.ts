import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private baseApiUrl = `${environment.url}/league`;

  constructor(private http: HttpClient) { }

  getLeagueList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
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
