import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  imports: [MatCheckboxModule, MatCardModule, MatSlideToggleModule, MatProgressSpinnerModule],
  exports: [MatCheckboxModule, MatCardModule, MatSlideToggleModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
