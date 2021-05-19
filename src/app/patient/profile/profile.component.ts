import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RegistersService } from 'src/app/services/registers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;
  disorders: any;
  private _disordersBackup: any;
  dropdownSettings: IDropdownSettings;
  supportedRegisters: any;
  emailTaken: boolean;
  
  constructor(private router: Router, private userService: UserService, private authService: AuthorizationService,
    private registersService: RegistersService) {
    this.emailTaken = false;
    this.dropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      searchPlaceholderText: "Familias de Enfermedades",
      noDataAvailablePlaceholderText: "No disponible",
      allowSearchFilter: true
    };

    this.userService.getUser().then((user: any) => {
      this.user = user
      console.log(user)
      this.disorders = Object.values(user.disorders)
      this._disordersBackup = {...this.disorders};
    });

    this.registersService.getSupportedRegisters()
      .then((families: any) => {
        this.supportedRegisters = families;
        this.supportedRegisters = families.map((supportedFamily: string) => {
          const words = supportedFamily.split(" ");
          return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        })
        this.supportedRegisters.push("Other");
      })
  }

  ngOnInit(): void {
  }

  submitProfile(data: any) {
    this.userService.updateUser(data)
     .then((response: any) => {
        this.authService.updateUser(response);
     })
     .catch(errorResponse => {
       if (errorResponse.status === 400 && errorResponse.error.Error === "Email already taken") {
         this.emailTaken = true;
         setTimeout(() => {this.emailTaken = false}, 1000 * 3);
       }
     })
  }

  addDisorder(value: any) {
    console.log("Queremos añadir el", value)
    const family = (value.family)? value.family[0] : "Other";
    const disorder = {
      type: value.disorder,
      family: family.toLowerCase()
    }
    this.disorders.push(disorder);
    console.log("disorders", this.disorders)
  }

  removeDisorder(index: number) {
    this.disorders.splice(index, 1);
  }

  submitDisorders() {
    console.log("datos a actualizar", this.disorders);
    const body = {
      disorders: this.disorders
    }

    console.log("Body de la peticion", body)
    this.userService.updateUser(body)
      .then(response => {
        this.disorders = Object.values(response.disorders)
      })
  }

  submitPassword(values: any) {
    console.log("datos a actualizar", values);
    const data = {
      password: values.password
    }

    this.userService.updateUser(data)
     .then((response: any) => console.log(response))
    //mostrar popup con mensaje de se han actualizado datos

    //si se cambia el nombre hay que actualizar el jwt y cambiar el usuario de authService
  }

  

  goBack() {
    this.router.navigateByUrl("/home");
  }
}
