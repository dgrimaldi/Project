import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Country} from "./country";
import {catchError, retry} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  countryUrl = 'https://restcountries.eu/rest/v2/all';


  /** Create curried handleError function that already knows the service name */
  createHandleError = <T>(operation = 'operation', result = {} as T) => this.handleErrorTest(operation, result);

  /** Creation of array of messages */
  messages: string[] = [];


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
        // retry(3), retry a failed request up to 3 times
        //catchError(this.handleErrorTest('getCountries', [])) // then handle the error
        catchError(this.handleError)
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

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleErrorTest<T>(operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      this.add(`${this}: ${operation} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      return of(result);
    };

  }

  private add(message: string) {
    this.messages.push(message);
  }

  private clear() {
    this.messages = [];
  }
}
