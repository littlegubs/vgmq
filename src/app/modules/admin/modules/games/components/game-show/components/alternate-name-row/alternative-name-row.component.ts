import { Component, Input } from '@angular/core'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game.http.service'
import { finalize } from 'rxjs/operators'
import { AlternativeName } from '../../../../../../../../shared/models/alternative-name'

@Component({
  selector: '[alternativeNameRow]',
  templateUrl: './alternative-name-row.component.html',
})
export class AlternativeNameRowComponent {
  @Input() alternativeName: AlternativeName
  loading = false

  constructor(private adminGameHttpService: AdminGameHttpService) {}

  toggle(): void {
    this.loading = true
    this.adminGameHttpService
      .toggleAlternativeName(this.alternativeName)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.alternativeName.enabled = !this.alternativeName.enabled
      })
  }
}
