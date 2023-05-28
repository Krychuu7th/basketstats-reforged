import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseApiUrl = `${environment.api.url}/role`;

  constructor(private http: HttpClient) { }

  getRoleList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }
}
