import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ApexAnnotations, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexXAxis } from 'ng-apexcharts'
import { GraphData } from '../../../../../../shared/models/user'
import { DateTime } from 'luxon'

@Component({
  selector: 'app-users-graph',
  templateUrl: './users-graph.component.html',
  standalone: false,
})
export class UsersGraphComponent implements OnInit, OnChanges {
  @Input() graphData: GraphData[]

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
    this.updateSeries()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData']) {
      this.updateSeries()
    }
  }

  private updateSeries(): void {
    if (!this.graphData) return
    this.series = [
      {
        data: [
          ...this.graphData.map((d) => ({ x: d.date, y: d.count })),
          {
            x: DateTime.now().toString(),
            y: this.graphData.length > 0 ? this.graphData[this.graphData.length - 1].count : 0,
          },
        ],
      },
    ]
  }
}
