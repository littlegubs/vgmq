import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required.bind(this), Validators.minLength(4)]],
      email: ['', Validators.email.bind(this)],
      mobile: [''],
      password: ['', [Validators.required.bind(this), Validators.minLength(8)]],
    })
  }

  registerUser(): void {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['log-in'])
      }
    })
  }
}
