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
    let tokensLength = this.getTokens().length;
    if (tokensLength == 0){
      this.nextId = 0;
    } else {
      this.nextId = tokensLength + 1;
    }
  }

  public getTokens(): Token[] {
    let localStorageItem = JSON.parse(localStorage.getItem('token'));
    return localStorageItem == null ? [] : localStorageItem.token;
    // return TOKENS;
  }
  public addToken(token: Token) {
    token.id = this.nextId;
    let tokens = this.getTokens();
    tokens.push(token);

    this.setLocalStorageTokens(tokens);
    this.nextId++;
    // TOKENS.push(token);
  }

  public removeToken(id: number){
    let tokens = this.getTokens().filter((token)=> token.id != id);
    this.setLocalStorageTokens(tokens);
  }

  private setLocalStorageTokens(tokens: Token[]) {
    localStorage.setItem('token', JSON.stringify({tokens : tokens}));
  }
}
