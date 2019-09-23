import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Token} from "../tokens/token";
import {Country} from "../api-service/country";
import {ApiService} from "../api-service/api.service";
import {TokenService} from "../tokens-service/token.service";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  issueTokenForm: FormGroup;
  private token: Token;
  private countries: Country[];
  private error: any;
  private isValid: boolean;
  private months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'];


  constructor(public modalRef: MatDialogRef<IssueModalComponent>,
              private formBuider: FormBuilder,
              private apiService: ApiService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    this.showCountries();
    this.issueTokenForm = this.formBuider.group({
      name: [null, [Validators.required]],
      ticker: [null, [Validators.required]],
      supply: [null, [Validators.required]], //this.confirmationValidator]],
      issuer: [null, [Validators.required]],
      template: ['ERC20'],
      country: [null, [Validators.required]]
    });
  }

  /**
   *
   */
  showCountries() {
    this.apiService.getCountries()
      .subscribe(
        countries => (this.countries = countries),
        error => this.error = error
      );
  }

  /**
   *
   * @param data
   */
  submitForm(data) {
    this.isValid = true;
    for (const i in this.issueTokenForm.controls) {
      this.issueTokenForm.controls[i].markAsDirty();
      this.issueTokenForm.controls[i].updateValueAndValidity();
      if (!this.issueTokenForm.controls[i].valid) {
        this.isValid = false;
      }
    }

    if (this.isValid) {
      const dateOBJ = new Date();
      this.token = new Token(
        data.name,
        data.ticker,
        data.supply,
        dateOBJ.getUTCDate() + ' ' + this.months[dateOBJ.getUTCMonth()] + ' ' + dateOBJ.getUTCFullYear(),
        data.issuer,
        data.template
      )
      this.tokenService.addToken(this.token);
      this.modalRef.close();
    }
  }

}

