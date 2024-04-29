import { Component, OnInit } from '@angular/core'
import { UsersHttpService } from '../../../../core/http/admin/users-http.service'
import { ApexAnnotations, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexXAxis } from 'ng-apexcharts'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersStatsComponent implements OnInit {
  users: number
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  xaxis: ApexXAxis = {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM',
        day: 'dd MMM',
        hour: 'HH:mm',
      },
    },
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
        x: new Date('23 Apr 2024').getTime(),
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
  constructor(private http: UsersHttpService) {}
  ngOnInit(): void {
    this.http.getStats().subscribe((r) => {
      this.users = r.count
      this.series = [{ data: r.stats.map((u) => ({ x: u.date, y: u.count })) }]
    })
  }
}
