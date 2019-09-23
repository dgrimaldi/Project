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

  constructor() {
    let tokens = this.getTokens();
    let tokensLength = tokens.length
    if (tokensLength == 0){
      this.nextId = 0;
    } else {
      let maxId = tokens[tokensLength -1].id;
      this.nextId = maxId + 1;
    }
  }

  /**
   * getItem to fetch the key of the token
   * @returns {Token[]} return an array of tokens from Local web storage
   * otherwise an empty array
   */
  public getTokens(): Token[] {
    let localStorageItem = JSON.parse(localStorage.getItem('tokens'));
    return localStorageItem == null ? [] : localStorageItem.tokens;
    // return TOKENS;
  }
  public addToken(token: Token) {
    token.id = this.nextId;
    let tokens = this.getTokens();
    tokens.push(token);

    // save the todos to local storage
    this.setLocalStorageTokens(tokens);
    this.nextId++;
    // TOKENS.push(token);
  }

  /**
   *
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
