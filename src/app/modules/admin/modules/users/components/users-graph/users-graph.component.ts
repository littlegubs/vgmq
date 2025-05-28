import { Component, Input, OnInit } from '@angular/core'
import { ApexAnnotations, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexXAxis } from 'ng-apexcharts'
import { UserFromAdmin } from '../../../../../../shared/models/user'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-users-graph',
  templateUrl: './users-graph.component.html',
  standalone: false,
})
export class UsersGraphComponent implements OnInit {
  @Input() users: UserFromAdmin[]

  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  xaxis: ApexXAxis = {
    type: 'datetime',
    max: Date.now(),
  }
  annotations: ApexAnnotations = {
    xaxis: [
      {
        x: new Date('28 Aug 2023').getTime(),
        borderColor: '#775DD0',
        label: {
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: 'Removed limited access',
        },
      },
      {
        x: new Date('27 Apr 2024').getTime(),
        borderColor: '#2df35e',
        label: {
          style: {
            color: '#000',
            background: '#2df35e',
          },
          orientation: 'horizontal',
          text: 'New homepage',
        },
      },
    ],
  }

  ngOnInit(): void {
    this.series = [
      {
        data: [
          ...this.users.filter((u) => u.enabled).map((u, i) => ({ x: u.createdAt, y: i + 1 })),
          { x: DateTime.now().toString(), y: this.users.length },
        ],
      },
    ]
  }
}
