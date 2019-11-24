import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email.value, this.password.value);
  }

}
