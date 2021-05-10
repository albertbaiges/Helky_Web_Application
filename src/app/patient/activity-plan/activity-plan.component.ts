import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-activity-plan',
  templateUrl: './activity-plan.component.html',
  styleUrls: ['./activity-plan.component.css']
})
export class ActivityPlanComponent implements OnInit {

  planID: string;

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit(): void {
    this.planID = this.authService.user.userID;
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }

}
