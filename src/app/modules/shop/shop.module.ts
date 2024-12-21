import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { ShopComponent } from './shop.component'
import { BecomeArtistDialogComponent } from './become-artist-dialog/become-artist-dialog.component'
import { SkinEditorComponent } from './skin-editor/skin-editor.component'
import { ImageTypeComponent } from './skin-editor/image-type/image-type.component'
import { MatStep, MatStepLabel, MatStepper } from '@angular/material/stepper'

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'create', component: SkinEditorComponent },
]

@NgModule({
  declarations: [ShopComponent, BecomeArtistDialogComponent, SkinEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ImageTypeComponent,
    MatStepper,
    MatStep,
    MatStepLabel,
  ],
})
export class ShopModule {}
