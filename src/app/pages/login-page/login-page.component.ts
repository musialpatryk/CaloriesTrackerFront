import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  host: {
    class:'app-login-page'
  }
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    userName: ['', Validators.required ],
    password: ['', Validators.required ]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    if(this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)) {
      console.log('Zalogowano - przeniesienie do głownej.');
      this.router.navigateByUrl('');
    } else {
      this.loginForm.reset();
      // TODO: alert user about error in processing username and password
    }  
  }

}
