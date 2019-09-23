/**
 * The class provides a service
 * The @Injectable() decorator marks it as a
 * service that can be injected
 */
import {Inject, Injectable} from '@angular/core';
import {Token} from "../tokens/token";


@Injectable({
  // we declare that this service should be create
  // by a root application injector
  providedIn: 'root'
})
export class TokenService {
  private nextId: number;

  /**
   *  Check if the storage is available and then
   *  fetch tokens from local storage. If the tokens
   *  array is empty set the id to 0, while if the
   *  array has a element set the key id to the next
   *  number
   */
  constructor() {
    if (this.storageAvailable('localStorage')) {
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

    // The JSON.parse() method parses a JSON string,constructing
    // the JavaScript value or object described by the string.
    if (this.storageAvailable('localStorage')) {
      let localStorageItem = JSON.parse(localStorage.getItem('tokens'));
      return localStorageItem == null ? [] : localStorageItem.tokens;
    }
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
  public removeToken(id: number) {
    let tokens = this.getTokens().filter((token) => token.id != id);
    this.setLocalStorageTokens(tokens);
  }

  /**
   * setItem to fe
   * @param {Token[]} tokens
   */
  private setLocalStorageTokens(tokens: Token[]) {
    if (this.storageAvailable('localStorage')) {
      localStorage.setItem('tokens', JSON.stringify({tokens: tokens}));
    }

  }

  /**
   *
   * @param type is the type of storage
   * @returns {any} true if the storage is available
   *                false otherwise
   */
  public storageAvailable(type) {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }
}
