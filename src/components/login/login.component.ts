import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required.bind(this)],
      password: ['', Validators.required.bind(this)],
    })
  }

  loginUser(): void {
    /*     if (RememberMe) {
      localStorage.setItem('Username', this.loginForm.value.username);
    } */
    this.authService.login(this.loginForm.value)
  }
}
