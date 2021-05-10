import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistersService } from 'src/app/services/registers.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  // register: Array<any>[];
  // tracking: any;
  // weekdays: string[];
  // months: string[];
  // date: Date;
  @Input() registerID: string;

  // constructor(private router: Router, private registersService: RegistersService) { 
  //   //! Llevas a un fichero shared que exporte estas cosas... pueden ser utiles en otros sitios
  //   this.weekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  //   this.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
  //    "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  //   this.register = [[], [], [], [], []]; // Month shaped array
  //   this.date = new Date();
  // }

  constructor(private registersService: RegistersService) {

  }

  ngOnInit() {
    this.registersService.getRegisterTracking(this.registerID)
      .then((response: any) => {
        const date = new Date();
        console.log(response, date.getFullYear(), date.getMonth())
        const days = response.tracking[date.getFullYear()][date.getMonth()+1];
        console.log(days);
      })
  }

  // ngOnInit(): void {
  //   this.registersService.getRegisterTracking("1").then((response: any) => {
  //     console.log(response)
  //     this.date = new Date(response.date);
  //     console.log("Day of the week", this.date.getDay());
  //     const {tracking} = response;
  //     this.tracking = tracking;
  //     let day = this.date.getDay();
  //     let week = 0;
  //     console.log(tracking);
  //     for (let i = 1; i <= 31; i++) {
  //       this.register[week][day] = tracking[`day_${i}`];
  //       if (day + 1 > 6) {
  //         day = 0;
  //         week++;
  //       } else {
  //         day++;
  //       }
  //     }

  //     console.log(this.register);

  //   });
  // }

  // goBack() {
  //   this.router.navigateByUrl("/salud");
  // }

}
