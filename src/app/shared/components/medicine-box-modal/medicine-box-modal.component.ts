import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MedicinesCimaService } from 'src/app/services/medicines-cima.service';

@Component({
  selector: 'app-medicine-box-modal',
  templateUrl: './medicine-box-modal.component.html',
  styleUrls: ['./medicine-box-modal.component.css']
})
export class MedicineBoxModalComponent implements OnInit {

  medicine: any;
  constructor(private bsModalRef: BsModalRef) { 
  }

  ngOnInit(): void { }

  closeModal() {
    this.bsModalRef.hide();
  }
}
