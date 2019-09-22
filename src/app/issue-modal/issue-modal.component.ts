import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Token} from "../tokens/token";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  issueTokenForm: FormGroup;
  private token: Token;

  constructor(public modalRef: MatDialogRef<IssueModalComponent>,
              private formBuider: FormBuilder) {
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


  submitForm() {
    for (const i in this.issueTokenForm.controls) {
      this.issueTokenForm.controls[i].markAsDirty();
      this.issueTokenForm.controls[i].updateValueAndValidity();
    }
    // this.modalRef.close();
  }
}
