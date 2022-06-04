import { Component, Input } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { AlternativeName } from '../../../../../../../../shared/models/alternative-name'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[alternativeNameRow]',
  templateUrl: './alternative-name-row.component.html',
})
export class AlternativeNameRowComponent {
  @Input() alternativeName: AlternativeName
  @Input() disabled: boolean
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
