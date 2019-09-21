import { Component, OnInit } from '@angular/core';
import {TokenService} from "../tokens-service/token.service";
import {Token} from "../tokens/token";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tokens: Token[];

  /**
   *
   * @param tokenService asking for TokenService
   * to be injected in this component
   */
  constructor(tokenService: TokenService) {
    this.tokens = tokenService.getTokens();
  }

  ngOnInit() {
  }

}
