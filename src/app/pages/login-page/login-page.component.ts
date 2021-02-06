import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        (data: { accessToken: string }) => {
          localStorage.setItem('token', data.accessToken);
          this.router.navigateByUrl('');
        },
        (err) => {
          this.loginForm.reset();
          this.router.navigateByUrl('panel-logowania?message=2');
        }
      );
  }

  isMessageVisible(): boolean {
    if (this.router.url.split('?')[1])
      return this.router.url.split('?')[1].includes('message=');
    return false;
  }

  getCurrentMessage(): string {
    const messageCode: number = parseInt(this.router.url.split('=')[1]);
    switch (messageCode) {
      case 1:
        return 'Zaloguj się aby kontynuować.';
      case 2:
        return 'Błędna nazwa użytkownika lub hasło.';
      case 3:
        return 'Zostałeś wylogowany!';
      default:
        return '';
    }
  }
}
