import { Component, forwardRef, OnInit } from '@angular/core'
import { Game } from '../../../../../../shared/models/game'
import { Subscription } from 'rxjs'
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game-http.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ParentComponent } from '../../../../../../shared/interfaces/parent.interface'

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  providers: [{ provide: ParentComponent, useExisting: forwardRef(() => GameSearchComponent) }],
})
export class GameSearchComponent implements OnInit, ParentComponent {
  name = 'xd'
  games: Game<number>[] = []
  gamesCount: number
  query = ''
  showDisabled = false
  onlyShowWithoutMusics = false
  http: Subscription
  loading = false
  form = new FormGroup({
    query: new FormControl('', Validators.required.bind(this)),
    showDisabled: new FormControl(false),
    onlyShowWithoutMusics: new FormControl(false),
  })

  constructor(private adminGameHttpService: AdminGameHttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.search()
    this.form.valueChanges.subscribe(() => {
      this.search()
    })
  }

  search(): void {
    if (this.http) {
      this.http.unsubscribe()
    }
    this.loading = true
    this.http = this.adminGameHttpService
      .search(this.form.value, 0, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  onScrollDown() {
    this.http = this.adminGameHttpService
      .search(this.form.value, this.games.length, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.games = [...this.games, ...res.data]
      })
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportGameDialogComponent)
    dialogRef.afterClosed().subscribe(() => {
      this.search()
    })
  }
}
