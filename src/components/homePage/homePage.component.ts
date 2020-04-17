import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-HomePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css'],
})
export class HomePageComponent {
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {}
}
