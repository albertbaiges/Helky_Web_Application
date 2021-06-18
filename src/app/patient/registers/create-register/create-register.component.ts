import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.css']
})
export class CreateRegisterComponent implements OnInit {

  answer: boolean;
  disorder: string;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  setAnswer(answer: boolean) {
    this.answer = answer;
    this.closeModal();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
