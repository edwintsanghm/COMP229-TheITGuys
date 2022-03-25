import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  surveyUrl = '/api/survey';
  constructor(private http: HttpClient) { }

  getSurveys() {
    return this.http.get(this.surveyUrl);
  }

  getSurveyById(surveyId:string) {
    return this.http.get(this.surveyUrl+'/'+surveyId);
  }

  addSurvey(survey: any) {
    return this.http.post<any>(this.surveyUrl+'/add', survey, httpOptions)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: error =>{
          console.log(error);
        }
      })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
