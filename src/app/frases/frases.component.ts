import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from '@core';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataResponse } from '@shared/classes/data-response';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastService } from '@app/services/toast.service';
import { HttpEventType } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Frase } from '@shared/models/frase';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Router } from '@angular/router';

const log = new Logger('Frases');

@Component({
  selector: 'app-frases',
  templateUrl: './frases.component.html',
  styleUrls: ['./frases.component.scss'],
})
export class FrasesComponent implements OnInit {
  formMode = 'New';
  sub: any;
  id: any;
  entryFormFrases: FormGroup;
  error: string | undefined;
  isAddNew: boolean = false;
  file: any;
  progress: any;
  dtOptions: DataTables.Settings = {};
  frases: Frase[];
  imagem: any;
  isLoadFullImage: boolean = false;
  usuarioLogado: any;

  constructor(
    public toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
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
      .confirm('Frase', 'Tem certeza que deseja excluir ?')
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
    this.apiHttpService.delete(this.apiEndpointsService.deleteFraseByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        log.debug(resp);
        this.showSuccess('Sucesso!', 'Frase excluida');
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
          .post(this.apiEndpointsService.postFrasesPagedEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            this.frases = resp.data;
            //console.log(this.frases);
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
          title: 'Nome da HQ',
          data: 'nomeHQ',
        },
        {
          title: 'Autor',
          data: 'autor',
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
    };
    log.debug('ngOnInit:', this.id);
  }

  imageInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    const formData = new FormData();

    formData.append(this.file.name, this.file);
    formData.append('NomeHQ', this.entryFormFrases.get('nomeHQ').value);
    formData.append('Autor', this.entryFormFrases.get('autor').value);

    const uploadReq = new HttpRequest('POST', this.apiEndpointsService.postImageUploadEndpoint(), formData, {
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
    this.entryFormFrases = this.formBuilder.group({
      id: [''],
      arquivo: ['', Validators.required],
      autor: [''],
      nomeHQ: [''],
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
