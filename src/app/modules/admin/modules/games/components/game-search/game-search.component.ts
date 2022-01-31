import { Component, OnInit } from '@angular/core'
import { Game } from '../../../../../../shared/models/game'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import {AdminGameHttpService} from "../../../../../../core/http/admin-game-http.service";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
})
export class GameSearchComponent implements OnInit {
  games: Game[] = []
  gamesCount: number
  query = ''
  showDisabled = false
  http: Subscription
  loading = false

  constructor(private adminGameHttpService: AdminGameHttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.adminGameHttpService
      .search(this.query, this.showDisabled)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportGameDialogComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.search()
    })
  }

  toggleShowDisabled(): void {
    this.showDisabled = !this.showDisabled
    this.search()
  }
}
