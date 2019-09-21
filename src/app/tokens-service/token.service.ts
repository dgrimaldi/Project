/**
 * The class provides a service
 * The @Injectable() decorator marks it as a
 * service that can be injected
 */
import {Injectable} from '@angular/core';
import {TOKENS} from "../tokens/mock-tokens";

@Injectable({
  // we declare that this service should be create
  // by a root application injector
  providedIn: 'root'
})
export class TokenService {
  constructor() {
  }

  getTokens() {
    return TOKENS;
  }
}
