import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  path: string | null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.path = this.currentRoute(this.router.url); //landing
    this.router.events.subscribe((event: any) => { //changes
      if(event instanceof NavigationEnd) {
        this.path = this.currentRoute(event.url)
      }
    });
  }

  private currentRoute(url: string) {
    return url.split("/").length > 2 ? url.split("/")[2].split(":")[1].slice(0, -1) : null;
  }

  goToTutorial(event: MouseEvent) {
    const element = event.target as Element;
    const route = element.getAttribute("data-tutorial")
    this.router.navigate(["tutorials", { outlets: { tutorials: [route] }}]);
  }


  goToHome() {
    this.router.navigateByUrl("/home");
  }

}
