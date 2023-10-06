import { Component, OnInit, ViewChild } from '@angular/core';

<<<<<<< HEAD
import { HQ } from '../@shared/models/hq';
import { ApiHttpService } from '../services/api-http.service';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { DataTablesResponse } from '../@shared/classes/data-tables-response';
import { Logger } from '../@core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { ToastService } from '../services/toast.service';
=======
import { HQ } from '@shared/models/hq';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { ToastService } from '@app/services/toast.service';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682

const log = new Logger('ListaDesejo');

@Component({
  selector: 'app-listadesejo',
  templateUrl: './listadesejo.component.html',
  styleUrls: ['./listadesejo.component.scss'],
})
export class ListaDesejoComponent implements OnInit {
<<<<<<< HEAD
  //dtOptions: DataTables.Settings = {};
  hqs: HQ[] = [];
  isLoadFullImage: boolean = false;
  capaFull: any;
  testeModal: 'TEste' = "TEste";
=======
  dtOptions: DataTables.Settings = {};
  hqs: HQ[];
  isLoadFullImage: boolean = false;
  capaFull: any;
  testeModal: 'TEste';
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
  usuarioLogado: any;

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    public toastService: ToastService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router
  ) {
    this.usuarioLogado = localStorage.getItem('logado');
    //console.log('curent status is ' + this.usuarioLogado);
    if (this.usuarioLogado === 'false') {
      this.router.navigateByUrl('/login');
    }
  }

  exibeImagemFull(capa: any) {
    this.isLoadFullImage = true;
    this.capaFull = capa;
    //console.log(capa);
  }

  // Handle Delete button click
  onDelete(id: any) {
    this.confirmationDialogService
      .confirm('Excluir HQ da Lista de Desejo', 'Tem certeza que deseja excluir ?')
      .then((confirmed) => {
        if (confirmed) {
          this.delete(id);
          log.debug('onDelete: ', id);
        }
      })
      .catch(() => {
        log.debug('onDelete: ', 'Cancel');
      });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // CRUD > Delete, map to REST/HTTP DELETE
  delete(id: any): void {
    this.apiHttpService.delete(this.apiEndpointsService.deleteDesejoByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'HQ excluida da Lista de Desejo');
        (async () => {
          await this.delay(2000);
          // Do something after
          window.location.reload();
        })();
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // ngbmodal service
  showSuccess(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
      headertext: headerText,
    });
  }

  ngOnInit() {
    this.isLoadFullImage = false;
    this.testeModal = 'TEste';
<<<<<<< HEAD

    /*this.dtOptions = {
=======
    this.dtOptions = {
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: true,
<<<<<<< HEAD
=======
      /*language: {
        processing: '<img class="img-loading" src="assets/loading.gif" alt="Angular" loading="lazy"/>',
      },*/
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
      ajax: (dataTablesParameters: any, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .post(this.apiEndpointsService.postDesejosPagedEndpoint(), dataTablesParameters)
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
          title: 'Thumbs',
          data: 'capa',
        },
        {
          title: 'Capa',
          data: 'capa',
        },
        {
          title: '',
          data: '',
        },
      ],
<<<<<<< HEAD
    };*/
=======
    };
>>>>>>> 01cf51104e28bd9d657bcc309e2ef41802fda682
  }
}
