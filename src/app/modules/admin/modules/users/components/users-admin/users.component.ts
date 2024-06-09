import { Component, OnInit } from '@angular/core'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'
import { UserFromAdmin } from '../../../../../../shared/models/user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersAdminComponent implements OnInit {
  users: UserFromAdmin[] | undefined
  constructor(private http: UsersHttpService) {}

  ngOnInit(): void {
    this.http.getStats().subscribe((response) => {
      this.users = response
    })
  }
}
