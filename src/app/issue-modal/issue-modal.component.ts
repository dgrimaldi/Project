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

  constructor(public modalRef: MatDialogRef<IssueModalComponent>) { }

  ngOnInit() {
  }


  submitForm() {
    this.modalRef.close();
  }
}
