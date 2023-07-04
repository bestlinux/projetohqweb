import { Component, OnInit, ViewChild } from '@angular/core';

import { HQ } from '@shared/models/hq';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { ToastService } from '@app/services/toast.service';
import { FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

const log = new Logger('ListaLeitura');

@Component({
  selector: 'app-listaleitura',
  templateUrl: './listaleitura.component.html',
  styleUrls: ['./listaleitura.component.scss'],
})
export class ListaLeituraComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  hqs: HQ[];
  hqAtualiza: HQ;
  isLoadFullImage: boolean = false;
  capaFull: any;
  testeModal: 'TEste';
  usuarioLogado: any;
  id: any;
  statusLido: any;
  picker: any;
  startDate = new FormControl(formatDate(new Date(), 'dd/MM/yyyy', 'pt'), Validators.required);
  currentRegistery: HQ;

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

  marcarLeitura() {
    this.currentRegistery.lido = 1;
    this.currentRegistery.dataLeitura = this.startDate.value;
    this.put(this.currentRegistery.id, this.currentRegistery);
  }

  exibeImagemFull(capa: any) {
    this.isLoadFullImage = true;
    this.capaFull = capa;
  }

  // Handle Update button click
  onUpdateNaoLido(hq: any) {
    this.hqAtualiza = hq;

    if (this.hqAtualiza.dataLeitura === null) this.showError('Erro!', 'Esta HQ já esta marcada como não lida');
    else {
      //this.hqAtualiza.dataLeitura = null;
      this.hqAtualiza.lido = 0;
      this.put(this.hqAtualiza.id, this.hqAtualiza);
    }
  }

  // CRUD > Update, map to REST/HTTP PUT
  put(id: any, data: any): void {
    this.apiHttpService.put(this.apiEndpointsService.putLeituraPagedEndpoint(id), data).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'Lista de leitura atualizada');
        (async () => {
          await this.delay(2000);
          window.location.reload();
        })();
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // Handle Delete button click
  onDelete(id: any) {
    this.confirmationDialogService
      .confirm('Excluir HQ', 'Tem certeza que deseja excluir a HQ?')
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
    this.apiHttpService.delete(this.apiEndpointsService.deleteLeituraByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'HQ excluida');
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

  // ngbmodal service
  showError(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-danger text-light',
      delay: 10000,
      autohide: false,
      headertext: headerText,
    });
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
          .post(this.apiEndpointsService.postLeiturasPagedEndpoint(), dataTablesParameters)
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
          title: 'Lido ?',
          data: 'lido',
        },
        {
          title: 'Data de termino',
          data: 'dataLeitura',
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
        {
          title: '',
          data: '',
        },
        {
          title: '',
          data: '',
        },
      ],
    };
  }
}
