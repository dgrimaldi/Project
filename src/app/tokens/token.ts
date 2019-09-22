/**
 * Creation of a token class
 */
export class Token {
  name: string;
  ticker: string;
  totalSupply: number;
  creationDate: string;
  issuerName: string;
  template: string;
  id: number;

  constructor(name: string,
              ticker: string,
              totalSupply: number,
              creationDate: string,
              issuerName: string,
              template: string) {
    this.name = name;
    this.ticker = ticker;
    this.totalSupply = totalSupply;
    this.creationDate = creationDate;
    this.issuerName = issuerName;
    this.template = template;

  }

}
