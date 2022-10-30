import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private meta: Meta, private titleService: Title) {
    this.titleService.setTitle('VGMQ - Video Game Music Quiz')
    this.meta.addTag({
      name: 'description',
      content: 'Play with your friends! Listen carefully and guess the game!',
    })
  }
}
