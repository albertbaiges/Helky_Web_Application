import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistersService } from 'src/app/services/registers.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  currentMonth: number;
  currentYear: number;

  months: Array<any>;
  currentIndex: number;
  currentDate: Date;
  weekdays: string[];
  monthNames: string[];
  weekdaysMap: any;
  date: Date;
  register: any;
  @Input() registerID: string;


  constructor(private registersService: RegistersService) {
    console.log("reached the constructor")
    this.register = []
      for(let i=0; i<6; i++) {
          this.register[i] = new Array(7);
      }
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
        const data = response.tracking[date.getFullYear()][date.getMonth()+1];
        this.date = new Date(data.stamp)
        this.registerMapping(data)
      });
  }


  private registerMapping(data: any) {
    if (data) {
      const firstDay = this.date.getDay();
      console.log("primer dia", this.date.getDay());
      for (let entry of Object.entries(data)) {
        if(entry[0] === "stamp")
        continue;
        
        
        const date = new Date(this.date.getFullYear(), this.date.getMonth(), Number(entry[0]));
        console.log("este dia cae en semana", date.getDay())
        let day = date.getDay();
        day = (day - 1 < 0) ? 6 : day -1; //Adjust to monday first
        const week = Math.floor((Number(entry[0]) + 4) / 7);
        console.log("dia", day)
        console.log("semana", week)
        this.register[week][day] = entry[1];
      }
    }

    console.log("registro del mes", this.register)
    const register = [...this.register];

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
          this.register = []
          for(let i=0; i<6; i++) {
            this.register[i] = new Array(7);
          }
          let data;
          if (Object.keys(response).length !== 0) {
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

}
