import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { HQ } from '@shared/models/hq';
import { DataResponseHQ } from '@shared/classes/data-response-hq';
import { DataResponseEditora } from '@shared/classes/data-response-editora';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { ToastService } from '@app/services/toast.service';
import { Editora } from '@app/@shared/models/editora';
import { Constants } from '@app/config/constants';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

const log = new Logger('Lista HQ Avancado');

@Component({
  selector: 'app-listahqavancado',
  templateUrl: './listahqavancado.component.html',
  styleUrls: ['./listahqavancado.component.scss'],
})
export class ListaHQAvancadoComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'linkDetalhes'];
  dataSource = new MatTableDataSource<HQ>();
  selection = new SelectionModel<HQ>(true, []);
  hqs: HQ[];
  hqsSelected: HQ[];
  formMode = 'New';
  sub: any;
  id: any;
  entryForm: FormGroup;
  error: string | undefined;
  hq: HQ;
  editora: Editora;
  isAddNew: boolean = false;
  readyToCreate: boolean = false;
  selectedEditora: any;
  selectedCategoria: any;
  selectedGenero: any;
  selectedStatus: any;
  selectedFormato: any;
  selectedLido: any;
  editoras: any;
  categorias: any;
  generos: any;
  status: any;
  formatos: any;
  lidos: any;
  isLoading = true;
  isLoadingCreate = false;
  spinner: any;
  capa: string;
  usuarioLogado: any;

  constructor(
    public toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private confirmationDialogService: ConfirmationDialogService,
    private constants: Constants,
    private router: Router
  ) 
  {
    this.usuarioLogado = localStorage.getItem('logado');
           
    if (this.usuarioLogado === 'false')
    {
      this.router.navigateByUrl('/login');
    }

    this.createForm();
  }



  ngOnInit() {
    this.loadEditora();
    this.loadGenero();
    this.loadCategoria();
    this.loadStatus();
    this.loadFormatos();
    this.loadLido();
    //this.generos = this.constants.generos;
    //this.categorias = this.constants.categorias;
    this.isLoading = false;
    this.readyToCreate = false;
    this.spinner = false;
    log.debug('ngOnInit:', this.id);
  }

  loadLido(): void {
    this.lidos = this.constants.lido;
  }

  loadFormatos(): void {
    this.formatos = this.constants.formatos;
  }

  loadStatus(): void {
    this.status = this.constants.status;
  }

  loadGenero(): void {
    this.generos = this.constants.generos;
  }

  loadCategoria(): void {
    this.categorias = this.constants.categorias;
  }

  loadEditora(): void {
    this.apiHttpService.get(this.apiEndpointsService.getEditoraEndpoint()).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponseEditora) => {
        //Assign data to class-level model object.
        this.editoras = resp.data;
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // Handle Create button click
  load(valor: any) {
    log.debug('OnInsert: ', valor);
    log.debug('OnInsert: ', this.entryForm.get('titulo').value);
  }

  // Handle Create button click
  loading(valor: any) {
    log.debug('OnInsert: ', valor);
    log.debug('OnInsert: ', this.entryForm.get('titulo').value);
  }

  
  // Handle Create button click
  onSearch() {
    this.readyToCreate = true;
    this.isLoading = true;
    this.advancedSearch(
      this.entryForm.get('titulo').value,
      this.entryForm.get('anoLancamento').value,
      this.entryForm.get('numeroEdicao').value,
      this.entryForm.get('roteiro').value,
      this.entryForm.get('personagens').value,
      this.selectedEditora,
      this.selectedCategoria,
      this.selectedGenero,
      this.selectedStatus,
      this.selectedFormato,
      this.selectedLido
    );

    //log.debug('OnSearch: ', this.entryForm.value);
    //log.debug('OnSearch: ', this.entryForm.get('titulo').value);
  }


  advancedSearch(
    titulo: any,
    anoLancamento: any,
    numeroEdicao: any,
    roteiro: any,
    personagens: any,
    editora: any,
    categoria: any,
    genero: any,
    status: any,
    formato: any,
    lido: any
  ): void {
    this.readyToCreate = true;

    this.isLoading = true;

    if (categoria == undefined || categoria == null) categoria = 0;

    if (genero == undefined || genero == null) genero = 0;

    if (status == undefined || status == null) status = 0;

    if (formato == undefined || formato == null) formato = 0;

    if (numeroEdicao == '' || numeroEdicao == null) numeroEdicao = 0;

    if (lido == undefined || lido == null) lido = 1;

    if (editora == '' || editora == null) editora = "null";

    if (anoLancamento == '' || anoLancamento == null) anoLancamento = "null";

    if (titulo == '' || titulo == null) titulo = "null";

    if (personagens == '' || personagens == null) personagens = "null";

    if (roteiro == '' || roteiro == null) roteiro = "null";

    log.debug('categoria: ', categoria);
    log.debug('genero: ', genero);
    log.debug('status: ', status);
    log.debug('formato: ', formato);
    log.debug('numeroEdicao: ', numeroEdicao);
    log.debug('lido: ', lido);
    log.debug('editora: ', editora);
    log.debug('anoLancamento: ', anoLancamento);
    log.debug('titulo: ', titulo);
    log.debug('personagens: ', personagens);
    log.debug('roteiro: ', roteiro);
    
    this.apiHttpService
      .get(
        this.apiEndpointsService.getHQAdvancedSearchEndpoint(
          categoria,
          genero,
          status,
          formato,
          lido,
          numeroEdicao,
          anoLancamento,
          titulo,
          roteiro,
          personagens,
          editora,
        ),
        titulo
      )
      .subscribe(
        (resp: DataTablesResponse) => {
          this.hqs = resp.data;
          this.isLoading = false;
          console.log(this.hqs);
          this.dataSource = new MatTableDataSource(this.hqs);
        },
        (error) => (this.isLoading = false)
      );
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      id: [''],
      titulo: [''],
      editora: [''],
      anoLancamento: [''],
      numeroEdicao: [''],
      genero: [''],
      categoria: [''],
      status: [''],
      formato: [''],
      lido: [''],
      personagens: [''],
      roteiro: ['']
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
