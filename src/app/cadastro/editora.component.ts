import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger } from '@core';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { Editora } from '@shared/models/editora';
import { DataResponseEditora } from '@shared/classes/data-response-editora';
import { DataResponse } from '@shared/classes/data-response';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastService } from '@app/services/toast.service';
import { Router } from '@angular/router';

const log = new Logger('Editora');

@Component({
  selector: 'app-editora',
  templateUrl: './editora.component.html',
  styleUrls: ['./editora.component.scss'],
})
export class EditoraComponent implements OnInit {
  formMode = 'New';
  sub: any;
  id: any;
  entryFormEditora: FormGroup;
  error: string | undefined;
  editora: Editora;
  isAddNew: boolean = false;
  existeEditoraNaHQ: any;
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

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.read(this.route.snapshot.paramMap.get('id'));
        this.formMode = 'Edit';
      } else {
        this.isAddNew = true;
        this.formMode = 'New';
      }
    });
    log.debug('ngOnInit:', this.id);
  }

  // Handle Create button click
  onCreate() {
    this.create(this.entryFormEditora.value);
    log.debug('OnInsert: ', this.entryFormEditora.value);
  }

  // Handle Delete button click
  onDelee() {
    this.validaExistenciaEditora(this.entryFormEditora.get('nome').value);
  }

  validaExistenciaEditora(nome: any): void {
    this.apiHttpService.get(this.apiEndpointsService.getHQByEditoraQueryEndpoint(nome), nome).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponse) => {
        //Assign data to class-level model object.
        this.existeEditoraNaHQ = resp.data;
        log.debug('onDelee: ', this.existeEditoraNaHQ);
        if (this.existeEditoraNaHQ == false) {
          this.confirmationDialogService
            .confirm('Editora', 'Tem certeza que deseja excluir ?')
            .then((confirmed) => {
              if (confirmed) {
                this.delete(this.entryFormEditora.get('id').value);
                log.debug('onDelee: ', this.entryFormEditora.value);
                this.router.navigateByUrl('/listaeditora');
              }
            })
            .catch(() => {
              log.debug('onDelee: ', 'Cancel');
            });
        } else {
          this.showError('Erro!', 'Não é possível excluir uma editora que já esteja associada a uma HQ');
        }
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // CRUD > Read, map to REST/HTTP GET
  read(id: any): void {
    this.apiHttpService.get(this.apiEndpointsService.getEditoraByIdEndpoint(id), id).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponseEditora) => {
        //Assign data to class-level model object.
        this.editora = resp.data;
        //Populate reactive form controls with model object properties.
        this.entryFormEditora.setValue({
          id: this.editora.id,
          nome: this.editora.nome,
        });
      },
      (error) => {
        log.debug(error);
      }
    );
  }
  // CRUD > Delete, map to REST/HTTP DELETE
  delete(id: any): void {
    this.apiHttpService.delete(this.apiEndpointsService.deleteEditoraByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'Editora excluida');
        this.router.navigateByUrl('/listaeditora');
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // CRUD > Create, map to REST/HTTP POST
  create(data: any): void {
    this.apiHttpService.post(this.apiEndpointsService.postEditoraEndpoint(), data).subscribe((resp: any) => {
      this.id = resp.data; //guid return in data
      if (resp.succeeded) {
        this.showSuccess('Sucesso!', 'Editora cadastrada');
        this.router.navigateByUrl('/listaeditora');
      } else {
        this.showError('Erro!', resp.message);
      }
    });
  }

  // CRUD > Update, map to REST/HTTP PUT
  /*put(id: string, data: any): void {
    this.apiHttpService.put(this.apiEndpointsService.putPositionsPagedEndpoint(id), data).subscribe((resp: any) => {
      this.id = resp.data; //guid return in data
    });
  }*/

  // reactive form
  private createForm() {
    this.entryFormEditora = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
    });
  }
  // ngbmodal service
  showSuccess(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: headerText,
    });
  }

  // ngbmodal service
  showError(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-danger text-light',
      delay: 4000,
      autohide: true,
      headertext: headerText,
    });
  }
}
