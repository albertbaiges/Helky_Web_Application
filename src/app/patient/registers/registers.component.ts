import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/services/patient.service';
import { RegistersService } from 'src/app/services/registers.service';
import { CreateRegisterComponent } from './create-register/create-register.component';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {

  disorders: Array<any>;
  bsModalRef: BsModalRef;
  
  constructor(private router: Router, private patientService: PatientService, private registersService: RegistersService,
    private modalService: BsModalService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.init();
  }

  init() {
      this.patientService.getDisorders()
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
    } else if (disorder.family !== "other") {
      const modalOptions = {
        animated: true,
        class: 'modal-dialog-centered border-radius-modal',
        backdrop: true,
        keyboard: true,
        initialState: {
          disorder: disorder.type
        }
      }
      this.bsModalRef = this.modalService.show(CreateRegisterComponent, modalOptions);
      this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
        console.log("Ha dicho que", this.bsModalRef.content.answer)
        if (this.bsModalRef.content.answer) {
          const body = {
            family: disorder.family
          }
          this.patientService.createRegister(body)
            .then(response => {
              const index = this.disorders.indexOf(disorder);
              this.disorders.splice(index, 1, response);
              this.toastr.success("Registro creado", "", {
                timeOut: 2000,
                positionClass: "toast-top-right"
              });
            })
        }
      });
    } else if (disorder.family === "other") {
      this.toastr.error("Esta patología no admite registros", "", {
        timeOut: 2000,
        positionClass: "toast-top-right"
      });
    }
  }

  
  goBack() {
    this.router.navigateByUrl("/home");
  }


}
