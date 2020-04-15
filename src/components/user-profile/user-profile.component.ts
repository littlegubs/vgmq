import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { User } from 'src/classes/user'

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
    currentUser: User

    constructor(public authService: AuthService, private actRoute: ActivatedRoute) {
        let id = this.actRoute.snapshot.paramMap.get('id')
        this.authService.getUserProfile(id).subscribe((res) => {
            this.currentUser = res.msg
        })
    }

    ngOnInit() {}
}
