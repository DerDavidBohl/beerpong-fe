import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "../user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  constructor(private users: UserService, private route: ActivatedRoute, private auth: AuthService) {}

  email = new FormControl();
  password = new FormControl();
  name = new FormControl();

  token: string = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['token'];
      
    });
  }

  register() {
    this.users.createUser(this.token, {
      email: this.email.value,
      name: this.name.value,
      password: this.password.value
    }).subscribe(() => {
      this.auth.login(this.email.value, this.password.value);
    });
  }

  invite(email: string) {

  }
}
