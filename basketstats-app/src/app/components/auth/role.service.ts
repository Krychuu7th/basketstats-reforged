import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseApiUrl = `${environment.url}/role`;

  constructor(private http: HttpClient) { }

  getRoleList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }
}
