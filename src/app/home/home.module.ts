import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialModule } from '../shared/material.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    MatGridListModule,
    MaterialModule,
    MatIconModule
    
    
    
  ]
})
export class HomeModule { }
