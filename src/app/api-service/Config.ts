/**
 * using an interface to specify the response object
 * interface instead of a class because a response cannot
 * automatically converted to an instance of a class
 */

export interface Config {
  countriesUrl: string;
  textfile: string;
  country: string;
}
