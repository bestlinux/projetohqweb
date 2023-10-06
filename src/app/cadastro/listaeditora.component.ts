import { Component, OnInit, ViewChild } from '@angular/core';

<<<<<<< HEAD
import { Editora } from '../@shared/models/editora';
import { ApiHttpService } from '../services/api-http.service';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { DataTablesResponse } from '../@shared/classes/data-tables-response';
import { Logger } from '../@core';
=======
import { Editora } from '@shared/models/editora';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
import { Router } from '@angular/router';

const log = new Logger('ListaEditora');

@Component({
  selector: 'app-listaeditora',
  templateUrl: './listaeditora.component.html',
  styleUrls: ['./listaeditora.component.scss'],
})
export class ListaEditoraComponent implements OnInit {
<<<<<<< HEAD
  //dtOptions: DataTables.Settings = {};
  editoras: Editora[] = [];
=======
  dtOptions: DataTables.Settings = {};
  editoras: Editora[];
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
  usuarioLogado: any;

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private router: Router
  ) {
    this.usuarioLogado = localStorage.getItem('logado');

    if (this.usuarioLogado === 'false') {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {

    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .post(this.apiEndpointsService.postEditoraPagedEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            this.editoras = resp.data;
            //console.log(this.editoras);
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
          title: 'Id',
          data: 'id',
        },
        {
          title: 'Nome',
          data: 'nome',
        },
      ],
    };*/
  }
}
