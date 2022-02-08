import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby } from '../../../../shared/models/lobby'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CustomSocket } from '../../../../core/socket/custom.socket'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbyUserRoles } from '../../../../shared/models/lobby-user'

@Component({
  selector: 'app-lobby-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit, OnDestroy {
  lobbyForm?: FormGroup
  lobby?: Lobby
  userCanEdit = true
  subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private lobbyHttpService: LobbyHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private socket: CustomSocket,
    private lobbyStore: LobbyStore
  ) {}

  ngOnInit(): void {
    this.lobby = this.lobbyStore.getLobby()
    this.lobbyForm = this.fb.group({
      name: [this.lobby?.name, Validators.required.bind(this)],
      password: [this.lobby?.password],
    })
    if (this.lobby) {
      this.subscriptions.push(
        this.lobbyStore.lobby.subscribe((lobby) => {
          this.lobby = lobby
          this.lobbyForm.setValue({ name: this.lobby.name, password: this.lobby.password })
        }),
        this.lobbyStore.me.subscribe((me) => {
          if (me !== null) {
            this.userCanEdit = me.role === LobbyUserRoles.Host
            this.userCanEdit ? this.lobbyForm.enable() : this.lobbyForm.disable()
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    if (this.lobby === null) {
      this.lobbyHttpService
        .create({
          name: this.lobbyForm.get('name').value,
          password: this.lobbyForm.get('password').value,
        })
        .subscribe((res) => {
          void this.router.navigate([`/lobby/${res.code}`])
        })
    } else {
      this.lobbyHttpService
        .update(this.lobby.code, {
          name: this.lobbyForm.get('name').value,
          password: this.lobbyForm.get('password').value,
        })
        .subscribe((res) => {
          console.log(res)
        })
    }
  }
}
