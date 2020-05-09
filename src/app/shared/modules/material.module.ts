import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  imports: [MatCheckboxModule, MatCardModule],
  exports: [MatCheckboxModule, MatCardModule],
})
export class MaterialModule {}
