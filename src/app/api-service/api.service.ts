import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Country} from "./Country";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private configUrl = 'https://restcountries.eu/rest/v2/regionalbloc/eu';

  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get<Country[]>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
    };
  }
