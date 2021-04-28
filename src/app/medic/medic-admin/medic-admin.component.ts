import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medic-admin',
  templateUrl: './medic-admin.component.html',
  styleUrls: ['./medic-admin.component.css']
})
export class MedicAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(path: string) {
    console.log("go to the path", path)
    this.router.navigateByUrl(path);
  }
}
