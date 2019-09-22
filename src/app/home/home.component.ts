import {Component, OnInit} from '@angular/core';
import {TokenService} from "../tokens-service/token.service";
import {Token} from "../tokens/token";
import {MatDialog} from "@angular/material";
import {IssueModalComponent} from "../issue-modal/issue-modal.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Array of tokens
  tokens: Token[];

  /**
   *
   * @param tokenService
   * @param modal
   * @param router
   * @param route
   */
  constructor(tokenService: TokenService,
              public modal: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
    this.tokens = tokenService.getTokens();
  }

  ngOnInit() {
  }

  /**
   *
   */
  openModal(): void {
    const modalRef = this.modal.open(IssueModalComponent, {
      width: '250px'
    });
    modalRef.afterClosed().subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  };

}
