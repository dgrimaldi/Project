import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TokenService} from "../tokens-service/token.service";
import {Token} from "../tokens/token";
import {MatDialog} from "@angular/material";
import {IssueModalComponent} from "../issue-modal/issue-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Array of tokens
  tokens: Token[];
  searchToken: any;
  // private searchToken: Subject<string> = new Subject();

  // @Input() readonly placeholder: string = '';
  // @Output() setValue: EventEmitter<string> = new EventEmitter();

  /**
   *
   * @param tokenService injection of TokenService to retrieve information about tokens
   * @param modal injection of the MatDialog service to import the dialog component from angular material
   * @param router is an implementation of a router service to manage the navigation with IssueModalComponent
   * @param route holds information about the route to this instance of HomeComponent
   */
  constructor(public tokenService: TokenService,
              public modal: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    //
    this.tokens = this.tokenService.getTokens();
  }

  /**
   *  A dialog is opened by calling the open method with a component to be loaded and an optional
   *  config object. The open method will return an instance of MatDialogRef
   */
  openModal(): void {
    const modalRef = this.modal.open(IssueModalComponent, {
      width: '600px'
    });

    // MatDialogRef provides a handle on the opened dialog.
    // It can be used to close the dialog and to receive notification
    // when the dialog has been closed. In this case is used
    // to navigate to and from “/home/issue-token” in the router
    modalRef.afterClosed().subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
      this.tokens = this.tokenService.getTokens();
    });
  };

  removeToken(number: number) {
    this.tokenService.removeToken(number);
    this.tokens = this.tokenService.getTokens();
  }

  search(){
    this.tokens = this.tokens.filter( res => {
      if(this.searchToken != "") {
        return res.name.toLocaleLowerCase().match(this.searchToken.toLocaleLowerCase());
      } else if (this.searchToken == "")
        return this.tokenService.getTokens();
    })
  }
}
