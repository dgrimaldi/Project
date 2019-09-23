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

  /**
   * @param {MatDialogRef<IssueModalComponent>} modalRef Reference to a dialog opened via the MatDialog service.
   * @param {FormBuilder} formBuider
   * @param {ApiService} apiService Reference to  via ApiService
   * @param {TokenService} tokenService
   */
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
   * The callback in the updated component method receives a typed data object,
   * which is easier and safer to consume
   */
  showCountries() {
    this.apiService.getCountries()
      .subscribe(
        // clone the data object, using its known Config shape
        (data: Country[]) => (this.countries = {...data}),
        //HttpClient return object when there is an error object instead of successful response.
        error => this.error = error
      );
  }

  /**
   * it checks if all fields are corrected, create an object Token,
   * pass this object to the TokenService and finally close the
   * modal
   * @param data fetches the information of the fields in the modal
   */
  submitForm(data) {
    this.isValid = true;
    for (const i in this.issueTokenForm.controls) {
      this.issueTokenForm.controls[i].markAsDirty();
      this.issueTokenForm.controls[i].updateValueAndValidity();
      if (!this.issueTokenForm.controls[i].valid) { //checking if the all element of the form are true
        this.isValid = false;
      }
    }

    if (this.isValid) {
      const dateOBJ = new Date();
      this.token = new Token( // if all the alement are true create an object Token
        data.name,
        data.ticker,
        data.supply,
        dateOBJ.getUTCDate() + ' ' + this.months[dateOBJ.getUTCMonth()] + ' ' + dateOBJ.getUTCFullYear(),
        data.issuer,
        data.template
      )
      this.tokenService.addToken(this.token); // then pass token to the service
      this.modalRef.close(); // close the modal
    }
  }

}

