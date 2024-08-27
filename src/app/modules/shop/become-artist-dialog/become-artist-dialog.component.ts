import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-become-artist-dialog',
  templateUrl: './become-artist-dialog.component.html',
})
export class BecomeArtistDialogComponent {
  loading = false
  errorMessage?: string
  form = new FormControl<string>(null, [
    Validators.required.bind(this),
    Validators.pattern(/^(https?:\/\/)?(www\.)?(instagram\.com|twitter\.com|x\.com|artstation\.com)\/.+$/),
  ])

  submit(): void {}
}
