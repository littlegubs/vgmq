import { Component, OnDestroy, OnInit } from '@angular/core'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'
import { UserFromAdmin } from '../../../../../../shared/models/user'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersAdminComponent implements OnInit, OnDestroy {
  usersObservable: Subscription
  users: UserFromAdmin[] | undefined
  enabledUsers: UserFromAdmin[] | undefined
  constructor(private http: UsersHttpService) {}

  ngOnInit(): void {
    this.usersObservable = this.http.getAllUsers().subscribe((response) => {
      this.users = response
      this.enabledUsers = this.users.filter((user) => user.enabled)
    })
  }

  ngOnDestroy(): void {
    this.usersObservable.unsubscribe()
  }
}
