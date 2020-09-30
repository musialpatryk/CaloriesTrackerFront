import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

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

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authService.gatherJWT(this.loginForm.value.userName, this.loginForm.value.password)) {
      console.log('Zalogowano - przeniesienie do głownej.');
      return
    }

    console.log('Nie zalogowano. - wyświetl komunikat.');
    this.loginForm.reset();
    return;
  }

}
