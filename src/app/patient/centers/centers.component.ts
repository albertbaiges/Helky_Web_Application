import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {

  centerIDs: Array<string>;
  centers: Array<any>;

  constructor(private router: Router, private userService: UserService, private searchService: SearchService) {
    this.centers = [];
  }
  
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.centerIDs = await this.userService.getCenters();
    this.centerIDs.forEach(async centerID => {
      this.centers.push(await this.searchService.getUser(centerID));
    });
  }


  goBack() {
    this.router.navigateByUrl("/home");
  }

}
