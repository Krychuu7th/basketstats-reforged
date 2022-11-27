import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private baseApiUrl = `${environment.api.url}/player`;

  constructor(private http: HttpClient) { }

  getPlayersOfTeam(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/teamPlayers/${id}`);
  }

  createPlayer(player: Object): Observable<Object> {
    return this.http.post(`${this.baseApiUrl}/create`, player);
  }

  updatePlayer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseApiUrl}/update/${id}`, value);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/delete/${id}`);
  }

}
