import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Logger } from '../@core';
import { ApiHttpService } from '../services/api-http.service';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { DataResponse } from '../@shared/classes/data-response';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastService } from '../services/toast.service';
import { HttpEventType } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { DataTablesResponse } from '../@shared/classes/data-tables-response';
import { Router } from '@angular/router';
import { Colecao } from '../@shared/models/colecao';

const log = new Logger('Colecao');

@Component({
  selector: 'app-colecao',
  templateUrl: './colecao.component.html',
  styleUrls: ['./colecao.component.scss'],
})
export class ColecaoComponent implements OnInit {
  formMode = 'New';
  sub: any;
  id: any;
  entryFormColecao!: UntypedFormGroup;
  error: string | undefined;
  isAddNew: boolean = false;
  file: any;
  progress: any;
  //dtOptions: DataTables.Settings = {};
  colecoes!: Colecao[];
  imagem: any;
  isLoadFullImage: boolean = false;
  usuarioLogado: any;

  constructor(
    public toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router
  ) {
    this.usuarioLogado = localStorage.getItem('logado');

    if (this.usuarioLogado === 'false') {
      this.router.navigateByUrl('/login');
    }

    this.createForm();
  }
  // Handle Delete button click
  onDelee(id: any) {
    this.confirmationDialogService
      .confirm('Colecao', 'Tem certeza que deseja excluir ?')
      .then((confirmed) => {
        if (confirmed) {
          this.delete(id);
          log.debug('onDelee: ', id);
          //this.router.navigateByUrl('/listaeditora');
        }
      })
      .catch(() => {
        log.debug('onDelee: ', 'Cancel');
      });
  }

  // CRUD > Delete, map to REST/HTTP DELETE
  delete(id: any): void {
    log.debug('deletando');
    this.apiHttpService.delete(this.apiEndpointsService.deleteColecaoByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        log.debug(resp);
        this.showSuccess('Sucesso!', 'Colecao excluida');
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

  exibeImagemFull(capa: any) {
    this.isLoadFullImage = true;
    this.imagem = capa;
    //console.log(capa);
  }

  ngOnInit() {
    this.isLoadFullImage = false;
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== undefined) {
        //this.read(this.route.snapshot.paramMap.get('id'));
        this.formMode = 'Edit';
      } else {
        this.isAddNew = true;
        this.formMode = 'New';
      }
    });

    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .post(this.apiEndpointsService.postColecaoPagedEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            this.colecoes = resp.data;
            console.log(this.colecoes);
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
          title: 'Descricao',
          data: 'descricao',
        },
        {
          title: 'Imagem',
          data: 'arquivo',
        },
        {
          title: 'Excluir',
          data: 'id',
        },
      ],
    };*/
    log.debug('ngOnInit:', this.id);
  }

  imageInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    const formData = new FormData();

    formData.append(this.file.name, this.file);
    formData.append('Descricao', this.entryFormColecao?.get('descricao')?.value);

    const uploadReq = new HttpRequest('POST', this.apiEndpointsService.postImageColecaoUploadEndpoint(), formData, {
      reportProgress: true,
    });

    this.apiHttpService.request(uploadReq).subscribe((resp: any) => {
      if (resp.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * resp.loaded) / resp.total);
      } else if (resp.type === HttpEventType.Response) {
        this.progress = 0;
        this.showSuccess('Sucesso!', 'Upload da imagem feito com sucesso');
        (async () => {
          await this.delay(2000);
          // Do something after
          window.location.reload();
        })();
      }
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // reactive form
  private createForm() {
    this.entryFormColecao = this.formBuilder.group({
      id: [''],
      arquivo: ['', Validators.required],
      descricao: [''],
    });
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
}
