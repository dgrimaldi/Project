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
  searchToken: string;
  thereIsStorage: boolean;

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
    this.tokens = this.tokenService.getTokens();
    this.thereIsStorage = this.tokenService.storageAvailable('localStorage');
  }

  /**
   *  A dialog is opened by calling the open method with a component to be loaded and an optional
   *  config object. The open method will return an instance of MatDialogRef
   *  If the local storage is not accessible an alert is displayed
   */
  openModal(): void {
    if (this.thereIsStorage) {
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
    } else
      alert("Local storage not available");
  };

  /**
   * call method removeToken in TokenService and
   * then update the tokens array for update the view
   * @param {number} key is the identifier in the storage
   */
  removeToken(key: number) {
    this.tokenService.removeToken(key);
    this.tokens = this.tokenService.getTokens();
  }

  /**
   *
   * @param {string} query
   */
  search(query: string) {
    if (query != '' && query.length >= 3) {
      this.tokens = this.tokens.filter(token => token.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1);
    } else if (query == '') {
      this.tokens = this.tokenService.getTokens();
    }
  }
}
