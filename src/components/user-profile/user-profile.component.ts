import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { User } from 'src/classes/user'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
})
export class UserProfileComponent {
  currentUser: User

  constructor(public authService: AuthService, private actRoute: ActivatedRoute) {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg
    })
  }
}
