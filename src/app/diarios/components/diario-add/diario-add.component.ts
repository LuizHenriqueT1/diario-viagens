import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';

@Component({
  selector: 'app-diario-add',
  templateUrl: './diario-add.component.html',
  styleUrls: ['./diario-add.component.scss'],
})
export class DiarioAddComponent implements OnInit {
  diario: Diario = {} as Diario;
  imagem!: File;
  hide?: boolean;

  setImage(ev: any) {
    // target é o input file
    if(this.imagem = ev.target.files[0]) {
      return this.hide = true;
    } return '';   

  }

  constructor(private ref: MatDialogRef<DiarioAddComponent>) {}

  onSubmit() {
    this.ref.close({ diario: this.diario, imagem: this.imagem });
  }

  ngOnInit(): void {}
}
