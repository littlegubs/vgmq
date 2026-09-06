import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { FormControl, Validators } from '@angular/forms'
import { Message } from '../../../../shared/models/lobby'
import { LobbyStore } from '../../../../core/store/lobby.store'
import { LobbySocket } from '../../../../core/socket/lobby.socket'
import { LobbyHttpService } from '../../../../core/http/lobby.http.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-lobby-chat',
  templateUrl: './chat.component.html',
  standalone: false,
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = []
  messages: Message[] = []
  myUsername: string | null = null
  hoveredMessageIndex: number | null = null
  message = new FormControl<string>(null, [Validators.required.bind(this)])
  @ViewChild('chat') chat: ElementRef
  @ViewChildren('messageElement') messageElements: QueryList<ElementRef>

  constructor(
    private lobbyStore: LobbyStore,
    private socket: LobbySocket,
    private lobbyHttpService: LobbyHttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.messages.subscribe((messages) => {
        this.messages = messages
      }),
      this.lobbyStore.me.subscribe((me) => {
        this.myUsername = me?.user.username || null
      }),
    ]
  }

  ngAfterViewInit(): void {
    this.scrollToBottom()
    this.messageElements.changes.subscribe(this.scrollToBottom)
  }

  scrollToBottom = (): void => {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    this.socket.emit('chat', this.message.value)
    this.message.setValue(null)
  }

  report(username: string): void {
    const lobby = this.lobbyStore.getLobby()
    if (lobby) {
      this.lobbyHttpService.report(lobby.code, username).subscribe({
        next: () => {
          this.snackBar.open('User reported successfully', 'Close', { duration: 3000 })
        },
        error: (err) => {
          const errorMessage: string = err.error?.message || 'Failed to report user'
          this.snackBar.open(errorMessage, 'Close', { duration: 3000, panelClass: 'danger' })
        },
      })
    }
  }
}
