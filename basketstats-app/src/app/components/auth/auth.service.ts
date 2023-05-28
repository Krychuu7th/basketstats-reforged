import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl = `${environment.api.url}/auth`;

  constructor(private http: HttpClient) { }

}
