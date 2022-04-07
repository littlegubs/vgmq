import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './modules/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GameItemComponent } from './components/game-item/game-item.component'
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule, MatIconModule],
  exports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, GameItemComponent],
  declarations: [GameItemComponent],
})
export class SharedModule {}
