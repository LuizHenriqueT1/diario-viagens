import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  limit,
  orderBy,
  query
} from '@angular/fire/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Message, MessageConverter } from '../../models/message';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: Firestore, private authService: AuthService) {}

  messages = collection(this.db, 'messages').withConverter(MessageConverter);

  getAllMessages(): Observable<Message[]> {
    return collectionData(query(this.messages, orderBy("createdAt")), { idField: 'id' });
  }

  sendMessage(infoMessage: Message) {
    return this.authService.userData.pipe(
      switchMap((user) => {
        infoMessage.createdAt = new Date();
        infoMessage.usuarioId = this.authService.uid;
        infoMessage.usuarioName = user['nome'];
        return from(addDoc(this.messages, infoMessage));
      })
    );
  }

}