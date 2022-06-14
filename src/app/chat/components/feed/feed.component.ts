import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Message } from 'src/app/core/models/message';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  allMessages$?: Observable<Message[]>;
  message: Message = {} as Message;

  sendMessageForm = this.fb.group({
    content: ['', [Validators.required]],
  });

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {}

  onSubmit() {
    const { content } = this.sendMessageForm.value;
    this.chatService
      .sendMessage({ content } as Message)
      .pipe(
        this.toast.observe({
          success: 'Mensagem enviada',
          error: 'Operação cancelada',
          loading: 'Enviando mensagem...',
        })
      )
      .subscribe(() => this.sendMessageForm.reset());
  }

  ngOnInit(): void {}
}