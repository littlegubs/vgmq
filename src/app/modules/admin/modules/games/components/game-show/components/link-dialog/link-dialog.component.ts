import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AdminGameHttpService } from '../../../../../../../../core/http/admin-game-http.service'
import { GameToMusic } from '../../../../../../../../shared/models/game-to-music'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-link-dialog',
  templateUrl: './link-dialog.component.html',
  standalone: false,
})
export class LinkDialogComponent implements OnInit {
  myControl = new FormControl()
  gameMusic: GameToMusic

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameToMusic,
    private adminGameHttpService: AdminGameHttpService,
    private dialogRef: MatDialogRef<LinkDialogComponent>
  ) {}

  ngOnInit(): void {
    this.gameMusic = this.data
  }

  submit(): void {
    this.adminGameHttpService.link(this.gameMusic.id, String(this.myControl.value)).subscribe((res) => {
      this.dialogRef.close(res)
    })
  }
}
