import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Country} from "./country";
import {catchError, retry} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  countryUrl = 'https://restcountries.eu/rest/v2/all';


  /** Creation of array of messages */
  messages: string[] = [];


  constructor(private http: HttpClient) {
  }


  /**
   * implemetation of HttpClient.get() to fetch information from the server
   * @returns {Observable<Country[]>} an observable array of Country
   */
  getCountries(): Observable<Country[]> {
    //this.test();
    //specify that interface as the HttpClient.get() call's type parameter in the service.
    return this.http.get<Country[]>(this.countryUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleErrorTest('getCountries', [])) // then handle the error
      );
  }


  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleErrorTest<T>(operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        'server returned code ' + error.status + ' with body ' + error.error;

      this.addErrorMessage(operation + ' failed: ' + message);
      console.error(error.error);

      // Let the app keep running by returning a safe result.
      return of(result);
    };

  }
  // Save an array of error
  private addErrorMessage(message: string) {
    this.messages.push(message);
  }

  public getErrorMessages() {
    return this.messages;
  }


}
