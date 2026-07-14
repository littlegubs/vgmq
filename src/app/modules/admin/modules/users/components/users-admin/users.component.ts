import { Component, OnDestroy, OnInit } from '@angular/core'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'
import { GraphData } from '../../../../../../shared/models/user'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: false,
})
export class UsersAdminComponent implements OnInit, OnDestroy {
  graphDataObservable: Subscription
  graphData: GraphData[] | undefined
  totalEnabledUsers: number = 0

  constructor(private http: UsersHttpService) {}

  ngOnInit(): void {
    this.graphDataObservable = this.http.getUsersGraphData().subscribe((response) => {
      this.graphData = response
      if (this.graphData && this.graphData.length > 0) {
        this.totalEnabledUsers = this.graphData[this.graphData.length - 1].count
      }
    })
  }

  ngOnDestroy(): void {
    this.graphDataObservable.unsubscribe()
  }
}
