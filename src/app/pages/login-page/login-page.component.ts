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

  onSubmit(): void{
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        (data: {'accessToken': string}) => {
          localStorage.setItem('token', data.accessToken);
          this.router.navigateByUrl('');
        },
        (err) => {
          this.loginForm.reset();
          this.router.navigateByUrl('panel-logowania?message=1');
        }
      );
  }

  isMessageVisible(): boolean{
    if(this.router.url.split('?')[1] === 'message=1') return true;
    return false;
  }
}
