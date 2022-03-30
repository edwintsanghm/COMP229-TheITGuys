import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL = environment.apiURL+'/api/user';
  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post(this.apiURL+'/login', {username: username, password: password}).pipe(
      map((result:any) => {
        if(result.user)
          localStorage.setItem('access_token', result.user.token);
          
        return result;
      })
    );
  }

  register(username:string, password:string) {
    return this.http.post(this.apiURL+'/register', {username: username, password: password});
  }
}
