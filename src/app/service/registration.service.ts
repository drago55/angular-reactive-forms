import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url:string ='http://localhost:3000/enroll';

  constructor(private http: HttpClient) { }

  register(userData) : Observable<any[]> {
    return this.http.post<any>(this.url, userData);
  }
}
