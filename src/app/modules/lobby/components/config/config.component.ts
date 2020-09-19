import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby } from '../../../../shared/models/lobby'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AppState } from '../../../../core/reducers/index.reducer'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {
  @Input('create') create: boolean
  lobbyForm?: FormGroup
  lobby?: Lobby
  userCanEdit = true

  constructor(
    private fb: FormBuilder,
    private lobbyHttpService: LobbyHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      name: ['', Validators.required.bind(this)],
      password: [''],
    })
    if (!this.create) {
      this.store.select('lobby').subscribe((res) => {
        this.lobby = res.lobby
        this.lobbyForm.controls.name.setValue(this.lobby.name)
        this.lobbyForm.controls.password.setValue(this.lobby.password)
        this.userCanEdit = res.role === LobbyUserRoles.Host
        this.userCanEdit ? this.lobbyForm.enable() : this.lobbyForm.disable()
      })
    }
  }

  submit(): void {
    if (this.create) {
      this.lobbyHttpService
        .create(
          new Lobby({
            name: this.lobbyForm.get('name').value,
            password: this.lobbyForm.get('password').value,
          })
        )
        .subscribe((res) => {
          void this.router.navigate([`/lobby/${res.code}`])
        })
    } else {
      this.lobbyHttpService
        .update(
          this.lobby.code,
          new Lobby({
            name: this.lobbyForm.get('name').value,
            password: this.lobbyForm.get('password').value,
          })
        )
        .subscribe((res) => {
          console.log(res)
        })
    }
  }
}
