import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl = `${environment.url}/auth`;

  constructor(private http: HttpClient) { }

}
