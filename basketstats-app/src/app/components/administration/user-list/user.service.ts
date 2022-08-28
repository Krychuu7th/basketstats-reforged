import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = `${environment.url}/user`;

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }

  getActiveUserList(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/activeList`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/${username}`);
  }

  isUserWithUsernameExisting(username: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/isUserWithUsernameExisting/${username}`);
  }

  isUserWithEmailExisting(email: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/isUserWithEmailExisting/${email}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseApiUrl}/create`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseApiUrl}/update/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/delete/${id}`);
  }

  changeUserActive(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/active/${id}`);
  }

}
