import { Component } from '@angular/core'
import { MatProgressBar } from '@angular/material/progress-bar'

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [MatProgressBar],
  templateUrl: './maintenance.component.html',
})
export class MaintenanceComponent {}
