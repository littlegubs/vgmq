import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

    constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

  ngOnInit() { }

  loginUser(): void {
/*     if (RememberMe) {
      localStorage.setItem('Username', this.loginForm.value.username);
    } */
    this.authService.login(this.loginForm.value)
  }
}
