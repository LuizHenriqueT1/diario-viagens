import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private breakPointsObservable: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakPointsObservable.observe(Breakpoints.Handset);

  }

}
