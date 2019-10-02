/**
 * The class provides a service
 * The @Injectable() decorator marks it as a
 * service that can be injected
 */
import {Inject, Injectable} from '@angular/core';
import {Token} from "../tokens/token";
import {LocalStorage} from "./localStorage";


@Injectable({
  // we declare that this service should be create
  // by a root application injector
  providedIn: 'root'
})
export class TokenService {
  private nextId: number;
  private localStorage: LocalStorage;

  /**
   *  it fetches tokens from local storage. If the tokens
   *  array is empty set the id to 0, while if the
   *  array has a element set the key id to the next
   *  number
   */
  constructor() {
    if (this.localStorage.storageAvailable('localStorage')) { //check if storage is available
      let tokens = this.getTokens();
      if (tokens.length == 0) {
        this.nextId = 0;
      } else {
        let maxId = tokens[tokens.length - 1].id;
        this.nextId = maxId + 1;
      }
    }
  }

  /**
   * getItem method is to fetch tokens from the local storage if the
   * storage is available
   * @returns {Token[]} return an array of tokens from Local web storage
   * otherwise an empty array
   */
  public getTokens(): Token[] {
    return this.localStorage.getTokens();
  }


  /**
   * it pushes token in tokens array and then call setLocalStorageTokens
   * So, update the id to the next number
   * @param {Token} token that want to store in Local web storage
   */
  public addToken(token: Token) {
    token.id = this.nextId;
    let tokens = this.getTokens();
    tokens.push(token);

    // save the tokens to local storage
    this.localStorage.storageAvailable(tokens);
    this.nextId++;
  }

  /**
   * The filter() method creates a new array with all elements that pass the test
   * implemented by the provided function.
   * filter() method implements callback function once for each element in an array
   * @param {number} id the key of the token which must delete
   */
  public removeToken(id: number) {
    let tokens = this.getTokens().filter((token) => token.id != id);
    this.localStorage.setLocalStorageTokens(tokens);
  }

}
