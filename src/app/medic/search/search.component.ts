import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearcherService } from 'src/app/services/searcher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: Array<any>;

  constructor(private router: Router, private searcherService: SearcherService, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit(filter: any) {
    for(let key in filter) {
      if(!filter[key]) {
        delete filter[key];
      }
    }
    this.searcherService.search(filter).then(users => {this.users = users});
  }


  sendRequest(userID: string) {
    console.log("Enviando peticion de amistad a", userID)
    const body = {
      target: userID,
      action: "request"
    }
    this.userService.postRelation(body)
      .then();
  }



  goBack() {
    this.router.navigateByUrl("/medic");
  }

}
