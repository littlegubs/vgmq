import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { UserFromAdmin } from '../../../../../../shared/models/user'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { BanDialogComponent } from './ban-dialog/ban-dialog.component'
import { UsersHttpService } from '../../../../../../core/http/admin/users-http.service'
import { Subscription, merge, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  standalone: false,
})
export class UsersTableComponent implements AfterViewInit, OnInit, OnDestroy {
  dialogSubscription: Subscription | undefined
  getAllUsersSubscription: Subscription | undefined
  searchSubscription: Subscription | undefined

  displayedColumns = ['username', 'enabled', 'createdAt', 'banReason', 'bannedBy', 'actions']
  dataSource = new MatTableDataSource<UserFromAdmin>([])
  totalUsers = 0

  searchSubject = new Subject<string>()
  currentSearch = ''

  constructor(public dialog: MatDialog, private http: UsersHttpService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.currentSearch = searchValue
        this.paginator.pageIndex = 0
        this.loadUsers()
      })
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadUsers()
    })

    this.loadUsers()
  }

  loadUsers(): void {
    this.getAllUsersSubscription?.unsubscribe()
    this.getAllUsersSubscription = this.http
      .getAllUsers(
        this.paginator.pageIndex,
        this.paginator.pageSize || 25,
        this.currentSearch,
        this.sort.active,
        this.sort.direction ? this.sort.direction.toUpperCase() : 'DESC'
      )
      .subscribe((response) => {
        this.dataSource.data = response.items
        this.totalUsers = response.total
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.searchSubject.next(filterValue.trim().toLowerCase())
  }

  openBanDialog(user: UserFromAdmin): void {
    const dialogRef = this.dialog.open(BanDialogComponent, {
      data: { user },
    })
    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers()
      }
    })
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect()
    this.dialogSubscription?.unsubscribe()
    this.getAllUsersSubscription?.unsubscribe()
    this.searchSubscription?.unsubscribe()
  }
}
