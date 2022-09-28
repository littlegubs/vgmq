import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
})
export class LoggedInComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
