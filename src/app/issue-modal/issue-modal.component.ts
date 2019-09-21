import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validator} from "@angular/forms";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  issueTokenForm: FormGroup;
  value: string;

  constructor(public modalRef: MatDialogRef<IssueModalComponent>) { }

  ngOnInit() {
  }


  submitForm(value: any) {
    this.modalRef.close();
  }
}
