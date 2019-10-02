
import {Token} from "../tokens/token";

export class LocalStorage {

  /**
   * setLocalStorageTokens requires a array of tokens and then pass, with
   * setItem method, to the localStorage with 'tokens' key and the array
   * as a value, the method will add that key to the storage,
   * or update that key's value if it already exists.
   * @param {Token[]} tokens array of tokens
   */

  public setLocalStorageTokens(tokens: Token[]) {
    if (this.storageAvailable('localStorage')) { //check if storage is available
      localStorage.setItem('tokens', JSON.stringify({tokens: tokens}));
    }

  }

  public getTokens(){
    // The JSON.parse() method parses a JSON string,constructing
    // the JavaScript value or object described by the string.
    if (this.storageAvailable('localStorage')) { //check if storage is available
      let localStorageItem = JSON.parse(localStorage.getItem('tokens'));
      return localStorageItem == null ? [] : localStorageItem.tokens;
    }}


  /**
   * Here is a function that detects whether localStorage is both supported and available
   * @param type is a property on the window object named localStorage.
   * @returns {any} true if the storage is available, false otherwise
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
