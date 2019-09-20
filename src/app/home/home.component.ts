import { Component, OnInit } from '@angular/core';
import {TOKENS} from "../tokens/mock-tokens";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataToken: any;
  tokens= TOKENS;

  constructor() { }

  ngOnInit() {
  }

}
