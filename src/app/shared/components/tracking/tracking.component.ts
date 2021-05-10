import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegistersService } from 'src/app/services/registers.service';
import { EditTrackingModalComponent } from './edit-tracking-modal/edit-tracking-modal.component';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  currentMonth: number;
  currentYear: number;
  timestamp: any;

  months: Array<any>;
  currentIndex: number;
  currentDate: Date;
  weekdays: string[];
  monthNames: string[];
  weekdaysMap: any;
  date: Date;
  register: any;
  patient: any;
  @Input() registerID: string;

  modalRef: BsModalRef;

  constructor(private registersService: RegistersService, private modalService: BsModalService) {
    console.log("reached the constructor")
    this.register = {};
    this.register.data = []
      for(let i=0; i<6; i++) {
          this.register.data[i] = new Array(7);
          for (let j=0; j<7; j++) {
            this.register.data[i][j] = {};
          }
      }
    console.log("creacion registro", this.register)
    this.weekdays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    this.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
     "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    this.months = [];
    this.currentIndex = 0;
  }

  ngOnInit() {
    this.registersService.getRegisterTracking(this.registerID)
      .then((response: any) => {
        const date = new Date();
        this.currentMonth = date.getMonth() + 1;
        this.currentYear = date.getFullYear();
        console.log("respuesta", response)
        this.patient = response.patient;
        const data = response.tracking[date.getFullYear()][date.getMonth()+1];
        this.date = new Date(data.stamp)
        console.log("esta fecha", this.date)
        this.register.stamp = data.stamp;
        this.registerMapping(data)
      });
  }


  private registerMapping(data: any) {
    console.log("registro actual", this.register)
    let currDate = new Date(this.register.stamp)
    console.log("currentDate", this.register.stamp)
    let firstDay = (currDate.getDay() - 1 < 0) ? 6 : currDate.getDay() -1;
    if (data) {
      console.log("datos", data)
      this.register.stamp = data.stamp;
      currDate = new Date(this.register.stamp)
      console.log("primer dia", this.date.getDay());
      for (let entry of Object.entries(data)) {
        if(entry[0] === "stamp")
        continue;
        
        
        const date = new Date(currDate.getFullYear(), currDate.getMonth(), Number(entry[0]));
        console.log("este dia cae en semana", date.getDay())
        let day = date.getDay();
        day = (day - 1 < 0) ? 6 : day -1; //Adjust to monday first

        let week = Math.floor(Number(entry[0]) / 7);
        if(firstDay === 0 && day === 6) {
          week--;
        }
        console.log("entrada", entry)
        console.log("dia", day)
        console.log("semana", week)
        this.register.data[week][day].logs = entry[1];
      }
    }

    const aux = new Date(this.register.stamp);
    console.log(aux)
    const endOfMonth = new Date(aux.getFullYear(), aux.getMonth() + 1, 0);
    console.log(endOfMonth)
    const lastDay = endOfMonth.getDate();
    console.log("ultimo dia", lastDay)
    let auxDay = 0;
    console.log("primer dia", firstDay)
    for(let i = 0; i < this.register.data.length; i++) {
      for(let j = 0; j< this.register.data[i].length; j++) {
        let number;
        console.log(auxDay, lastDay)
        if((j < firstDay && i === 0) || auxDay >= lastDay) {
          number = 0
        } else {
          number = ++auxDay;
        }
        this.register.data[i][j].number = number;
      }
    }


    console.log("registro del mes", this.register)
    const register = {...this.register};

    this.months.push(register);
    console.log("cacheado", register, this.months)
  }

  previousMonth() {
    --this.currentMonth;
    if (!this.months[++this.currentIndex]) {
      this.registersService.getRegisterTracking(this.registerID,
      {
        year: this.currentYear,
        month: this.currentMonth
      })
        .then((response: any) => {
          console.log("respuesta recibida****", response)
          console.log("registro", this.register)
          let date = new Date(this.currentYear, this.currentMonth - 1)
          console.log("Fecha stamp", date)
          this.register.stamp = date.toISOString();
          this.register.data = [];
          for(let i=0; i<6; i++) {
            this.register.data[i] = new Array(7);
            for (let j=0; j<7; j++) {
              this.register.data[i][j] = {};
            }
          }
          let data;
          if (response.tracking) {
            data = response.tracking[this.currentYear][this.currentMonth];
          }
            console.log("datos de la respuesta", data)
            this.registerMapping(data);
        })
    } else {
      this.register = this.months[this.currentIndex];
    }
    console.log("meses cacheados", this.months)
    console.log("Current index", this.currentIndex);
    console.log("Current month", this.currentMonth);
  }

  nextMonth() {
    console.log("hacia adelante")
    //Next month will always be cached
    this.currentMonth++;
    const month = this.months[--this.currentIndex];
    console.log("mes a cargar", month, "con indice", this.currentIndex, "siendo el mes", this.currentMonth)
    this.register = month;
  }


  openEditModal(day: any, weekNum: number, dayNum: number) {
    console.log("weeknum", weekNum, "dayNum", dayNum)
    console.log("registro", this.register)
    const modalOptions = {
      animated: true,
      class: 'modal-dialog-centered modal-lg',
      backdrop: true,
      keyboard: true,
      initialState: {
        day: {...day},
        patient: this.patient,
        registerID: this.registerID,
        stamp: this.register.stamp
      },
    }
    this.modalRef = this.modalService.show(EditTrackingModalComponent, modalOptions);
    // this.bsModalRef.onHide.subscribe(() => { //! Unsubscribre from this thing
    //   if (this.bsModalRef?.content.hideReason === "success") {
    //     //! what now?
    //   }
    // });
  }
}
