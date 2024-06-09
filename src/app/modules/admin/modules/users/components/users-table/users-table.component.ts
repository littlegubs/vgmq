import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core'
import { UserFromAdmin } from '../../../../../../shared/models/user'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { BanDialogComponent } from './ban-dialog/ban-dialog.component'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @Input() users: UserFromAdmin[]
  displayedColumns = ['id', 'email', 'username', 'enabled', 'createdAt', 'banReason', 'actions']
  dataSource: MatTableDataSource<UserFromAdmin>

  constructor(public dialog: MatDialog, private http: UsersHttpService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users)
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  openBanDialog(user: UserFromAdmin): void {
    const dialogRef = this.dialog.open(BanDialogComponent, {
      data: { user },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.getStats().subscribe((response) => {
          this.dataSource = new MatTableDataSource(response)
        })
      }
    })
  }
}
