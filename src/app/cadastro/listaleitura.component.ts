import { Component, OnInit, ViewChild } from '@angular/core';

import { HQ } from '@shared/models/hq';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { ToastService } from '@app/services/toast.service';

const log = new Logger('ListaLeitura');

@Component({
  selector: 'app-listaleitura',
  templateUrl: './listaleitura.component.html',
  styleUrls: ['./listaleitura.component.scss'],
})
export class ListaLeituraComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  hqs: HQ[];
  hqAtualiza : HQ;
  isLoadFullImage: boolean = false;
  capaFull: any;
  testeModal: 'TEste';
  usuarioLogado: any;
  id: any;
  statusLido: any;

  constructor(
    private apiHttpService: ApiHttpService, 
    private apiEndpointsService: ApiEndpointsService,
    public toastService: ToastService, 
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router) 
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

  // Handle Update button click
  onUpdateLido(hq:any) {
    this.hqAtualiza = hq;
    this.hqAtualiza.lido = 1;
    this.put(this.hqAtualiza.id, this.hqAtualiza);
  }

   // Handle Update button click
   onUpdateNaoLido(hq:any) {
    this.hqAtualiza = hq;
    this.hqAtualiza.lido = 0;
    this.put(this.hqAtualiza.id, this.hqAtualiza);
  }

  // CRUD > Update, map to REST/HTTP PUT
  put(id: any, data: any): void {
    this.apiHttpService.put(this.apiEndpointsService.putLeituraPagedEndpoint(id),data).subscribe(
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
      .confirm('Excluir HQ da Lista de Leitura', 'Tem certeza que deseja excluir ?')
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
    return new Promise( resolve => setTimeout(resolve, ms) );
   } 

   // CRUD > Delete, map to REST/HTTP DELETE
   delete(id: any): void {
    this.apiHttpService.delete(this.apiEndpointsService.deleteLeituraByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'HQ excluida da Lista de Leitura');
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
          data: 'lastModified',
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
      ],
    };
  }
}
