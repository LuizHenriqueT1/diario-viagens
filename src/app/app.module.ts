import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { DiariosModule } from './diarios/diarios.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    AuthModule, // As rotas em auth agora fazem parte do app
    DiariosModule,
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    DashboardModule,
    ChatModule
  ],
  providers: [],
  bootstrap: [AppComponent], // primeiro componente a ser exibido
})
export class AppModule {}
