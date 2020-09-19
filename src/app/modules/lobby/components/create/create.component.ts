import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { Lobby } from '../../../../shared/models/lobby'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  lobbyForm: FormGroup

  constructor(private fb: FormBuilder, private lobbyHttpService: LobbyHttpService) {}

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      name: ['', Validators.required.bind(this)],
      password: [''],
    })
  }

  submit(): void {
    this.lobbyHttpService
      .create(
        new Lobby({
          name: this.lobbyForm.get('name').value,
          password: this.lobbyForm.get('password').value,
        })
      )
      .subscribe((res) => {
        const url = new URL('http://localhost:3000/.well-known/mercure')
        url.searchParams.append('topic', 'http://localhost/lobbies/yoyo')
        url.searchParams.append(
          'topic',
          '/.well-known/mercure/subscriptions/http%3A%2F%2Flocalhost%2Flobbies%2Fyoyo{/subscriber}'
        )
        const es = new EventSource(url.toString(), { withCredentials: true })
        es.onmessage = (ev): void => {
          console.log(ev)
        }
      })
  }
}
