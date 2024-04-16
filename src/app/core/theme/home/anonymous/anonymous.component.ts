import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ViewportScroller } from '@angular/common'

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
})
export class AnonymousComponent {
  constructor(public router: Router, private viewportScroller: ViewportScroller) {}

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0])
  }
}
