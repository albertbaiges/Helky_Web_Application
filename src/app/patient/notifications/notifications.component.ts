import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;

  constructor(private userService: UserService) { }

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
      .then();
  }

  rejectRequest(userID: string) {

  }

  

}
