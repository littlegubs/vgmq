import { Component, OnInit } from '@angular/core'
import { UsersHttpService } from '../../../../core/http/admin/users-http.service'
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexXAxis } from 'ng-apexcharts'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersStatsComponent implements OnInit {
  users: number
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  xaxis: ApexXAxis
  constructor(private http: UsersHttpService) {}
  ngOnInit(): void {
    this.xaxis = {
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
    this.http.getStats().subscribe((r) => {
      this.users = r.count
      this.series = [{ data: r.stats.map((u) => ({ x: u.date, y: u.count })) }]
    })
  }
}
