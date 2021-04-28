import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DisordersService } from 'src/app/services/disorders.service';
import { RegistersService } from 'src/app/services/registers.service';
import { CreateRegisterModalComponent } from "./create-register-modal/create-register-modal.component"
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-salud',
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.css']
})
export class SaludComponent implements OnInit {

  disorders: Array<any>;
  bsModalRef?: BsModalRef; //! Remove this ? as soon as possible when found how to mute the not initialized

  constructor(private disordersService: DisordersService, 
    private registersService: RegistersService,
    private router: Router,
    private modalService: BsModalService,
    private userService: UserService) { 
    this.disorders = [];
  }

  ngOnInit(): void {
    console.log(this.userService.user)
    this.init();
  }

  init() {
        //Get the ID from the login
        const {userID} = this.userService.user;
        this.disordersService.getDisordersByPatientID(userID)
        .then((response: any) => {
          console.log(response);
          // if (response.status === "Success"){
            console.log(Object.values(response.disorders))
            this.disorders = Object.values(response.disorders);
          // } else {
          //   console.error(response.message);
          // }
        });
  }

  loadRegisters(id: string | null, disorder: string | null) {
    if (id) {
      console.log("dentro... redirecting")
      this.registersService.setRegisterID(id);
      this.router.navigate(["/salud", "register"]);
    } else {
      const modalOptions = {
        animated: true,
        class: 'modal-dialog-centered',
        backdrop: true,
        keyboard: true,
        initialState: {
          disorder: disorder! //No null assertion
        }
      }
      this.bsModalRef = this.modalService.show(CreateRegisterModalComponent, modalOptions);
      this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
        if (this.bsModalRef?.content.hideReason === "success") {
          this.init();
        }
      });
    }
    
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }

}
