import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { map, Observable, startWith } from 'rxjs'

import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  reservaForm = new FormGroup({
    localRetirada: new FormControl(''),
    dataRetirada: new FormControl(''),
    horaRetirada: new FormControl(''),
    localDevolucao: new FormControl(''),
    dataDevolucao: new FormControl(''),
    horaDevolucao: new FormControl(''),
  })
  horariosRetirada$?: Observable<string[]> = new Observable<string[]>()
  horariosRetirada = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
  ]
  horariosDevolucao$?: Observable<string[]> = new Observable<string[]>()
  horariosDevolucao = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
  ]

  constructor() {}

  ngOnInit(): void {
    this.horariosRetirada$ = this.reservaForm
      .get('horaDevolucao')
      ?.valueChanges.pipe(
        startWith(''),
        map((horaDevolucao) => {
          return this._filter(
            this.horariosRetirada,
            horaDevolucao || '',
            false,
          )
        }),
      )

    this.horariosDevolucao$ = this.reservaForm
      .get('horaRetirada')
      ?.valueChanges.pipe(
        startWith(''),
        map((horaRetirada) => {
          return this._filter(
            this.horariosDevolucao,
            horaRetirada || '',
            true,
          )
        }),
      )
  }

  private _filter(
    horarios: string[],
    horaSelecionada: string,
    retirada: boolean,
  ): string[] {
    return horarios.filter((horaFiltrada) => {
      let incluir: boolean = true
      let horaFiltro = moment(horaFiltrada, 'HH:mm');

      if (horaSelecionada) {
        let horaSelecao = moment(horaSelecionada, 'HH:mm');

        if (retirada) {
          return horaSelecao.isBefore(horaFiltro);
        } else {
          return horaSelecao.isAfter(horaFiltro);
        }
      }

      return incluir
    })
  }
}
