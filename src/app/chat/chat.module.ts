import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    FeedComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class ChatModule { }
