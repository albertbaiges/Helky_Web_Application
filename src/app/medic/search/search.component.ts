import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearcherService } from 'src/app/services/searcher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: Array<any>;

  constructor(private router: Router, private searcherService: SearcherService, private userService: UserService,
    private toastr: ToastrService) { }

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
    .then(response => {
      console.log(response)
      this.toastr.success("Solicitud enviada", "", {
      timeOut: 2000,
        positionClass: "toast-top-right"
      });
    })
    .catch(errorResponse => {
      const {error} = errorResponse;
      console.log(error)
      if(error.Error === "Users already relationed") {
        this.toastr.info("Ya se ha establecido relación con este usuario", "", {
          timeOut: 2000,
          positionClass: "toast-top-right"
        });
      } else if(error.Error === "Cannot add somebody with the same role") {
        this.toastr.error("No se puede establecer relación con otro médico", "", {
          timeOut: 2000,
          positionClass: "toast-top-right"
        });
      } else if (error.Error === "Request already sent") {
        this.toastr.info("Solicitud previamente enviada", "", {
          timeOut: 2000,
            positionClass: "toast-top-right"
          });
      }
    });
  }



  goBack() {
    this.router.navigateByUrl("/medic");
  }

}
