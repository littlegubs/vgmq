import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
})
export class LoggedInComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log('yoyo')
  }

}
