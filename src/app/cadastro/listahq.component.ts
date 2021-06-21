import { Component, OnInit, ViewChild } from '@angular/core';

import { HQ } from '@shared/models/hq';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { Router } from '@angular/router';

const log = new Logger('ListaHQ');

@Component({
  selector: 'app-listahq',
  templateUrl: './listahq.component.html',
  styleUrls: ['./listahq.component.scss'],
})
export class ListaHQComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  hqs: HQ[];
  isLoadFullImage: boolean = false;
  capaFull: any;
  testeModal: 'TEste';
  usuarioLogado: any;

  constructor(private apiHttpService: ApiHttpService, private apiEndpointsService: ApiEndpointsService, private router: Router) 
  {
      this.usuarioLogado = localStorage.getItem('logado');
      //console.log('curent status is ' + this.usuarioLogado);
      if (this.usuarioLogado === 'false')
      {
        this.router.navigateByUrl('/login');
      }
  }

  exibeImagemFull(capa: any) {
    this.isLoadFullImage = true;
    this.capaFull = capa;
    //console.log(capa);
  }

  ngOnInit() {
    this.isLoadFullImage = false;
    this.testeModal = 'TEste';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: true,
      /*language: {
        processing: '<img class="img-loading" src="assets/loading.gif" alt="Angular" loading="lazy"/>',
      },*/
      ajax: (dataTablesParameters: any, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .post(this.apiEndpointsService.postHQsPagedEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            this.hqs = resp.data;
            console.log(this.hqs);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      // Set column title and data field
      columns: [
        {
          title: 'Titulo',
          data: 'titulo',
        },
        {
          title: 'Editora',
          data: 'editora',
        },
        {
          title: 'Publicação',
          data: 'dataPublicacao',
        },
        {
          title: 'Licenciador',
          data: 'licenciador',
        },
        {
          title: 'Lido',
          data: 'lido',
        },
        {
          title: 'Thumbs',
          data: 'capa',
        },
        {
          title: 'Capa',
          data: 'capa',
        },
      ],
    };
  }
}
