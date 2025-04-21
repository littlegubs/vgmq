import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { UserFromAdmin } from '../../../../../../shared/models/user'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { BanDialogComponent } from './ban-dialog/ban-dialog.component'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  standalone: false,
})
export class UsersTableComponent implements AfterViewInit, OnInit, OnDestroy {
  dialogSubscription: Subscription | undefined
  getAllUsersSubscription: Subscription | undefined
  @Input() users: UserFromAdmin[]
  displayedColumns = ['username', 'enabled', 'createdAt', 'banReason', 'bannedBy', 'actions']
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
    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsersSubscription = this.http.getAllUsers().subscribe((response) => {
          this.dataSource = new MatTableDataSource(response)
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect()
    this.dialogSubscription?.unsubscribe()
    this.getAllUsersSubscription?.unsubscribe()
  }
}
