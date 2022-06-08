import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';

@Component({
  selector: 'app-diario-detail',
  templateUrl: './diario-detail.component.html',
  styleUrls: ['./diario-detail.component.scss'],
})
export class DiarioDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, // guarda informações sobre a rota atual
    private diariosService: DiariosService,
    private breakponitObserver: BreakpointObserver
  ) {}

  diario$?: Observable<Diario>;

  ngOnInit(): void {
    this.diario$ = this.diariosService.getDiarioById(
      this.route.snapshot.params['id']
    );

    this.breakponitObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { username :  '', cols: 1, rows: 1,  },
            // console.log(matches)
          ]

        }
  
        return [
          { title: '' , cols: 1, rows: 1, }
        ]
      })
    ).subscribe();
  }
}
