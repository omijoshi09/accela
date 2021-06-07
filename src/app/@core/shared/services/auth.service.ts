import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly USER_VERIFIED = '_userVerified';
  private readonly USER_ID = '_userId';

  isLoggedIn = new BehaviorSubject<boolean>(this.loggedIn);

  // For Request handling:
  protected headers: HttpHeaders;
  private readonly base_url = 'https://jsonplaceholder.typicode.com';

  constructor(
    protected httpClient: HttpClient,
  ) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }


  private get loggedIn(): boolean {

    const loggedInStatus = this._getUserLoginStatus();
    if (loggedInStatus === null) {
      return false;
    }
    // Check status
    if(loggedInStatus) return true;

    // Not verified user
    return false
  }

  signIn(email: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.base_url}/users?email=${email}`,
      {observe: 'response'}
    );
  }

  _getUserLoginStatus() {
    console.log(JSON.parse(<string>localStorage.getItem(this.USER_VERIFIED)));
    return JSON.parse(<string>localStorage.getItem(this.USER_VERIFIED));
  }

  _getUserId() {
    return JSON.parse(<string>localStorage.getItem(this.USER_ID));
  }

  _saveUser(userId:number): void {
    localStorage.setItem(this.USER_VERIFIED, JSON.stringify(true));
    localStorage.setItem(this.USER_ID, JSON.stringify(userId));
    this.isLoggedIn.next(true);
  }


  // Logout
  logoutLocal() {
    localStorage.removeItem(this.USER_VERIFIED);
    this.isLoggedIn.next(false);
  }


}
