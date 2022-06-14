import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/core/models/message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, AfterViewInit {
  @ViewChild('chatScroll') chatScroll?: ElementRef;
  @ViewChildren('msgsScroll') msgsScroll?: QueryList<any>;

  message: Message = {} as Message;
  allMessages$?: Observable<Message[]>;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.msgsScroll?.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    console.log(this.chatScroll)
    try {
      if (this.chatScroll) {
        this.chatScroll.nativeElement.scrollTop =
          this.chatScroll.nativeElement.scrollHeight;
      }
    } catch (err) {}
  };

  userId(message: Message) {
    return message.usuarioId === this.authService.uid;
  }

  ngOnInit() {
    this.allMessages$ = this.chatService.getAllMessages();
  }
}