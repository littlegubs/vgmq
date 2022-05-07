import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
})
export class AnonymousComponent {
  constructor(public router: Router) {}
}
