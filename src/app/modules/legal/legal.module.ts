import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component'

const routes: Routes = [
  { path: 'tos', component: TermsOfServiceComponent },
  {
    path: '**',
    redirectTo: 'tos',
  },
]
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LegalModule {}
