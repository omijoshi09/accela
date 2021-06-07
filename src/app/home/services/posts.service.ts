import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
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

  getPersonalPosts(userId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.base_url}/posts?userId=${userId}`,
      {observe: 'response'}
    );
  }

  getAllPosts(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.base_url}/posts`,
      {observe: 'response'}
    );
  }

  getUserInformation(userId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.base_url}/users?id=${userId}`,
      {observe: 'response'}
    );
  }


}
