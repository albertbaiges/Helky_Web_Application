import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {

  mealID: string;

  constructor(private router: Router, private authService: AuthorizationService) {
    this.mealID = this.authService.user.userID;
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl("/home");
  }
}
