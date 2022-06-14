import { Converter } from "./converter";

export interface Message {
  id?: string;
  content: string;
  createdAt: Date;
  usuarioId?: string;
  usuarioName?: string;
}

export const MessageConverter: Converter<Message> = {
  toFirestore: (doc) => doc,
  fromFirestore: (snapshot, options) => {
    const obj = snapshot.data(options)!;

    return {
      ...obj,
      createdAt: obj['createdAt']?.toDate(),
    } as Message;
  },
};