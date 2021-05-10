import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateRegisterModalComponent } from 'src/app/salud/salud-component/create-register-modal/create-register-modal.component';
import { RegistersService } from 'src/app/services/registers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {

  disorders: Array<any>;
  bsModalRef: BsModalRef;
  
  constructor(private router: Router, private userService: UserService, private registersService: RegistersService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.init();
  }

  init() {
      this.userService.getDisorders()
      .then((disorders: any) => {
        console.log(disorders, typeof disorders)
        this.disorders = disorders;
      });
  }

  loadRegisters(disorder: any) {
    if (disorder.registerID) {
      console.log("dentro... redirecting")
      this.registersService.setRegisterID(disorder.registerID);
      this.router.navigateByUrl("/home/registers/tracking");
    } else if (disorder.family !== "Other") {
      const modalOptions = {
        animated: true,
        class: 'modal-dialog-centered',
        backdrop: true,
        keyboard: true,
        initialState: {
          disorder: disorder.type! //No null assertion
        }
      }
      this.bsModalRef = this.modalService.show(CreateRegisterModalComponent, modalOptions);
      this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
        if (this.bsModalRef?.content.hideReason === "success") {
          this.init();
        }
      });
    } else if (disorder.family === "Other") {
      alert("es un other")
    }
  }

  
  goBack() {
    this.router.navigateByUrl("/home");
  }


}
