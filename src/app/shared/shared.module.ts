import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './modules/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab)
  }
}
