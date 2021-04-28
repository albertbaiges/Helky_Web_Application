import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';

@Component({
  selector: 'app-medicine-box-modal',
  templateUrl: './medicine-box-modal.component.html',
  styleUrls: ['./medicine-box-modal.component.css']
})
export class MedicineBoxModalComponent implements OnInit {

  medicine: any;
  constructor() { }

  ngOnInit(): void { console.log(this.medicine)}

}
