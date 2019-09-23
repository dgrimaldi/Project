import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Country} from "./country";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private countryUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
  }

  /**
   * implemetation of HttpClient.get() to fetch information from the server
   * @returns {Observable<Country[]>} an observable array of Country
   */
  getCountries(): Observable<Country[]> {
    //specify that interface as the HttpClient.get() call's type parameter in the service.
    return this.http.get<Country[]>(this.countryUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  /**
   * it inspects HttpErrorResponse and figures out what really happened
   * then interprets and solves the error.
   * @param {HttpErrorResponse} error the response from HttpClient.get()
   * @returns {Observable<never>} an observable with a user-facing error message
   */
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
    return throwError(
      'Something bad happened; please try again later.');
    };
  }
