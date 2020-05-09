import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './modules/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
