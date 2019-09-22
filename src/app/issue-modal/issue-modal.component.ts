import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Token} from "../tokens/token";
import {Config} from "../api-service/Config";
import {ApiService} from "../api-service/api.service";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  issueTokenForm: FormGroup;
  private token: Token;
  private config: Config;
  headers: string[];
  private conutries: string[];
  private error: any;


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

  showConfig(){
    this.apiService.getConfig()
      .subscribe(
        (data: Config) => this.config = {...data},
        error => this.error = error
      );
  }

  showConfigResponse() {
    this.apiService.getConfigResponse()
    // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        console.log(resp.body['name'] +' '+resp+' '+resp.headers);


        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
console.log(this.headers)
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });

  }


  submitForm() {
    for (const i in this.issueTokenForm.controls) {
      this.issueTokenForm.controls[i].markAsDirty();
      this.issueTokenForm.controls[i].updateValueAndValidity();
    }
    // this.modalRef.close();
  }
}
