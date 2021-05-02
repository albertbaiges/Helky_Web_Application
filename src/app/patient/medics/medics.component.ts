import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {
  
  medicIDs: Array<string>;
  medics: Array<any>;

  constructor(private router: Router, private userService: UserService, private searchService: SearchService) {
    this.medics = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.medicIDs = await this.userService.getMedics();
    this.medicIDs.forEach(async medicID => {
      this.medics.push(await this.searchService.getUser(medicID));
    });
    console.log("mis medicos", this.medics)
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
