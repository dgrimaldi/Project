/**
 * The class provides a service
 * The @Injectable() decorator marks it as a
 * service that can be injected
 */
import {Inject, Injectable} from '@angular/core';
import {TOKENS} from "../tokens/mock-tokens";
import {Token} from "../tokens/token";


@Injectable({
  // we declare that this service should be create
  // by a root application injector
  providedIn: 'root'
})
export class TokenService {
  private nextId: number;

  /**
   *
   *
   */

  constructor() {
    let tokens = this.getTokens();
    if (tokens.length == 0){
      this.nextId = 0;
    } else {
      let maxId = tokens[tokens.length -1].id;
      this.nextId = maxId + 1;
    }
  }

  /**
   * getItem method is to fetch the key of the token from the local storage
   * @returns {Token[]} return an array of tokens from Local web storage
   * otherwise an empty array
   */
  public getTokens(): Token[] {
    let localStorageItem = JSON.parse(localStorage.getItem('tokens'));
    return localStorageItem == null ? [] : localStorageItem.tokens;
  }

  /**
   * push token in tokens array and then call setLocalStorageTokens
   * So, update the id to the next number
   * @param {Token} token that want to store in Local web storage
   */
  public addToken(token: Token) {
    token.id = this.nextId;
    let tokens = this.getTokens();
    tokens.push(token);

    // save the tokens to local storage
    this.setLocalStorageTokens(tokens);
    this.nextId++;
  }

  /**
   * The filter() method creates a new array with all elements that pass the test
   * implemented by the provided function.
   * filter() method implements callback function once for each element in an array
   * @param {number} id the key of the token which must delete
   */
  public removeToken(id: number){
    let tokens = this.getTokens().filter((token)=> token.id != id);
    this.setLocalStorageTokens(tokens);
  }

  /**
   * setItem to fe
   * @param {Token[]} tokens
   */
  private setLocalStorageTokens(tokens: Token[]) {
    localStorage.setItem('tokens', JSON.stringify({tokens : tokens}));
  }
}
