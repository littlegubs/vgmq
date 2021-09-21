import {Component, OnDestroy, OnInit} from '@angular/core';
import {LobbyHttpService} from '../../../../core/http/lobby.http.service';
import {Lobby, LobbyStatuses} from '../../../../shared/models/lobby';
import {LobbyUserRoles} from '../../../../shared/models/lobby-user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-button-play',
  templateUrl: './button-play.component.html'
})
export class ButtonPlayComponent implements OnInit, OnDestroy {
  lobby?: Lobby;
  role: string;
  lobbyUsersRoles = LobbyUserRoles;
  lobbyStatus = LobbyStatuses;
  subscriptions: Subscription[] = [];

  constructor(private lobbyHttpService: LobbyHttpService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // this.store.select('lobby').subscribe((res) => {
      //   this.lobby = res.lobby;
      //   this.role = res.role;
      //   console.log(this.role);
      // }));
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  play(): void {
    this.lobbyHttpService.play(this.lobby.code).subscribe(() => {
    });
  }



}
