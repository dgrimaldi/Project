import {Component, OnInit} from '@angular/core';
import {TokenService} from "../tokens-service/token.service";
import {Token} from "../tokens/token";
import {MatDialog} from "@angular/material";
import {MatDialogModule} from '@angular/material/dialog';
import {IssueModalComponent} from "../issue-modal/issue-modal.component";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(tokenService: TokenService,
              public modal: MatDialog) {
    this.tokens = tokenService.getTokens();
  }

  ngOnInit() {
  }

  openModal(): void {
    const modalRef = this.modal.open(IssueModalComponent, {
      width: '250px'
    })
    modalRef.afterClosed().subscribe(res => {
      //this.router.navigate(['../'], {relativeTo: this.route});
    })
  };

}
