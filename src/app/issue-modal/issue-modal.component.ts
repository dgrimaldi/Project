import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Token} from "../tokens/token";
import {Country} from "../api-service/Country";
import {ApiService} from "../api-service/api.service";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  issueTokenForm: FormGroup;
  private token: Token;
  headers: string[];
  private countries: Country[];
  private error: any;
  private config: Country;


  constructor(public modalRef: MatDialogRef<IssueModalComponent>,
              private formBuider: FormBuilder,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.issueTokenForm = this.formBuider.group({
      name: [null, [Validators.email, Validators.required]],
      ticker: [null, [Validators.required]],
      supply: [null, [Validators.required]], //this.confirmationValidator]],
      issuer: [null, [Validators.required]],
      template: ['ERC20'],
      country: ['IT']
    });
  }

  showCountries(){
    this.apiService.getCountries()
      .subscribe(
        (data: Country[]) => this.countries = {...data},
        error => this.error = error
      );
  }


  submitForm() {
    for (const i in this.issueTokenForm.controls) {
      this.issueTokenForm.controls[i].markAsDirty();
      this.issueTokenForm.controls[i].updateValueAndValidity();
    }
    // this.modalRef.close();
  }
}
