import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any;

  constructor(private router: Router, private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getNotifications()
      .then(notifications => {
        this.notifications = notifications;
      });
  }


  acceptRequest(userID: string) {
    const body = {
      target: userID,
      action: "accept"
    }
    this.userService.postRelation(body)
      .then((response: any) => {
        if(response.userID === userID) {
          const request = this.notifications.requests.find((request: any) => request.userID === userID);
          const index = this.notifications.requests.indexOf(request);
          this.notifications.requests.splice(index, 1);
          this.toastr.success("Solicitud aceptada", "", {
            timeOut: 2000,
              positionClass: "toast-top-right"
            });
        }
      });
  }

  rejectRequest(userID: string) {
    const body = {
      target: userID,
      action: "reject"
    }
    this.userService.postRelation(body)
      .then((response: any) => {
          const request = this.notifications.requests.find((request: any) => request.userID === userID);
          const index = this.notifications.requests.indexOf(request);
          this.notifications.requests.splice(index, 1);
          this.toastr.success("Solicitud rechazada", "", {
            timeOut: 2000,
              positionClass: "toast-top-right"
            });
      });
  }

  goBack() {
    this.router.navigateByUrl("/center");
  }

}
