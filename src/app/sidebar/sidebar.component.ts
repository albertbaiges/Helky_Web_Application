import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username: any;

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit(): void {//Quitar el servicio auth y usar el servicio usuario, eliminar todo lo que creamos en auth para poder hacer esto
    this.authService.username$.subscribe(username => {
      this.username = username;
      console.log("ha cambiado el usuario a", username)
    })
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.router.navigateByUrl("/login");
  }

  openFeedback() {
    window.open("https://forms.gle/9vY9d6VkDaV3ubkx5", "_blank");
  }

}
