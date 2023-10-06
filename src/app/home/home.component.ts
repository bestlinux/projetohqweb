import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiHttpService } from '../services/api-http.service';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { Logger } from '../@core';
import { HQ } from '../@shared/models/hq';
import { DataTablesResponse } from '../@shared/classes/data-tables-response';
import { Frase } from '../@shared/models/frase';
import { Router } from '@angular/router';

const log = new Logger('Home');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  hqs: HQ[] = [];
  frases: Frase[] = [];

  frase1!: Frase;

  hqCard1!: HQ;
  hqCard2!: HQ;
  hqCard3!: HQ;
  hqCard4!: HQ;
  hqCard5!: HQ;
  dataTablesParameters: any;
  tituloCard1!: string;
  tituloCard2!: string;
  tituloCard3!: string;
  tituloCard4!: string;
  tituloCard5!: string;
  publicacaoCard1!: string;
  publicacaoCard2!: string;
  publicacaoCard3!: string;
  publicacaoCard4!: string;
  publicacaoCard5!: string;
  capa1!: string;
  capa2!: string;
  capa3!: string;
  capa4!: string;
  capa5!: string;
  idHq1!: string;
  idHq2!: string;
  idHq3!: string;
  idHq4!: string;
  idHq5!: string;

  autorFrase!: string;
  tituloFraseHQ!: string;
  arquivoFrase!: string;
  totalHqs!: number;

  usuarioLogado: any;

  constructor(
    private router: Router,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService
  ) {
    this.usuarioLogado = localStorage.getItem('logado');

    if (this.usuarioLogado === 'false') {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    this.apiHttpService
      .get(this.apiEndpointsService.getHQsEndpoint(), this.dataTablesParameters)
      .subscribe((resp: DataTablesResponse) => {
        this.hqs = resp.data;
        this.totalHqs = this.hqs.length;
        log.debug(this.hqs);

        this.hqCard1 = this.hqs[Math.floor(Math.random() * this.hqs.length)];

        this.hqCard2 = this.hqs[Math.floor(Math.random() * this.hqs.length)];

        this.hqCard3 = this.hqs[Math.floor(Math.random() * this.hqs.length)];

        this.hqCard4 = this.hqs[Math.floor(Math.random() * this.hqs.length)];

        this.hqCard5 = this.hqs[Math.floor(Math.random() * this.hqs.length)];

        this.tituloCard1 = this.hqCard1.titulo;
        this.tituloCard2 = this.hqCard2.titulo;
        this.tituloCard3 = this.hqCard3.titulo;
        this.tituloCard4 = this.hqCard4.titulo;
        this.tituloCard5 = this.hqCard5.titulo;

        this.publicacaoCard1 = this.hqCard1.dataPublicacao;
        this.publicacaoCard2 = this.hqCard2.dataPublicacao;
        this.publicacaoCard3 = this.hqCard3.dataPublicacao;
        this.publicacaoCard4 = this.hqCard4.dataPublicacao;
        this.publicacaoCard5 = this.hqCard5.dataPublicacao;

        this.capa1 = this.hqCard1.capa;
        this.capa2 = this.hqCard2.capa;
        this.capa3 = this.hqCard3.capa;
        this.capa4 = this.hqCard4.capa;
        this.capa5 = this.hqCard5.capa;

        this.idHq1 = this.hqCard1.id;
        this.idHq2 = this.hqCard2.id;
        this.idHq3 = this.hqCard3.id;
        this.idHq4 = this.hqCard4.id;
        this.idHq5 = this.hqCard5.id;
      });

    this.apiHttpService
      .get(this.apiEndpointsService.getFrasesEndpoint(), this.dataTablesParameters)
      .subscribe((resp: DataTablesResponse) => {
        this.frases = resp.data;
        log.debug(this.frases);

        this.frase1 = this.frases[Math.floor(Math.random() * this.frases.length)];

        this.autorFrase = this.frase1.autor;
        this.tituloFraseHQ = this.frase1.nomeHQ;
        this.arquivoFrase = this.frase1.arquivo;
      });
  }
}
