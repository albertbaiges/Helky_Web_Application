import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal"
import { RegistersService } from 'src/app/services/registers.service';

@Component({
  selector: 'app-create-register-modal',
  templateUrl: './create-register-modal.component.html',
  styleUrls: ['./create-register-modal.component.css']
})
export class CreateRegisterModalComponent implements OnInit {

  disorder?: string;
  hideReason: "success" | "cancel";

  constructor(public bsModalRef: BsModalRef, private registersService: RegistersService) {
    this.hideReason = "cancel";
  }

  ngOnInit(): void {
  }

  closeModal() {
    console.log("closing")
    this.bsModalRef.hide();
  }

  // Requests the service (api) to create a new register for the disorder
  async requestRegister() { //! Maybe call it create... as well
    const response = await this.registersService.createRegister(this.disorder!); //! Remove the assertion ! (assert no null)
    if (response.registerId) { //!THis must get change as soon as possible
      this.hideReason = "success";
      this.bsModalRef.hide();
    }
  }
}
