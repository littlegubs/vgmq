import { Component, forwardRef, OnInit } from '@angular/core'
import { Game } from '../../../../../../shared/models/game'
import { debounceTime, Subscription } from 'rxjs'
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { AdminGameHttpService } from '../../../../../../core/http/admin-game-http.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ParentComponent } from '../../../../../../shared/interfaces/parent.interface'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  providers: [{ provide: ParentComponent, useExisting: forwardRef(() => GameSearchComponent) }],
})
export class GameSearchComponent implements OnInit, ParentComponent {
  name = 'xd'
  games: Game[] = []
  gamesCount: number
  query = ''
  showDisabled = false
  onlyShowWithoutMusics = false
  loading = false
  scrollLoading = false
  form: FormGroup

  constructor(
    private adminGameHttpService: AdminGameHttpService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe((params) => {
        this.form = new FormGroup({
          query: new FormControl(params.get('query') ?? '', Validators.required.bind(this)),
          showDisabled: new FormControl(params.get('showDisabled') === 'true'),
          onlyShowWithoutMusics: new FormControl(params.get('onlyShowWithoutMusics') === 'true'),
        })
        this.search()
      })
      .unsubscribe()
    this.form.valueChanges.pipe(debounceTime(250)).subscribe(() => {
      this.search()
      const queryParams: Params = this.form.value

      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        replaceUrl: true,
      })
    })
  }

  search(): void {
    this.loading = true
    this.adminGameHttpService
      .search(this.form.value, 0, 24)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.gamesCount = res.count
        this.games = res.data
      })
  }

  onScrollDown(): void {
    if (this.scrollLoading) {
      return
    }
    this.scrollLoading = true
    this.adminGameHttpService
      .search(this.form.value, this.games.length, 24)
      .pipe(finalize(() => (this.scrollLoading = false)))
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
