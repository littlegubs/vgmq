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

@Component({
  selector: 'app-lobby-chat',
  templateUrl: './chat.component.html',
  standalone: false,
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = []
  messages: Message[] = []
  message = new FormControl<string>(null, [Validators.required.bind(this)])
  @ViewChild('chat') chat: ElementRef
  @ViewChildren('messageElement') messageElements: QueryList<ElementRef>

  constructor(private lobbyStore: LobbyStore, private socket: LobbySocket) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.lobbyStore.messages.subscribe((messages) => {
        this.messages = messages
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
    this.lobbyStore.setMessages([])
    this.subscriptions.forEach((sb) => sb.unsubscribe())
  }

  submit(): void {
    this.socket.emit('chat', this.message.value)
    this.message.setValue(null)
  }
}
