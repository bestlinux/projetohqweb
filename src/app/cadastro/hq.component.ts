import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

const log = new Logger('hq');

@Component({
  selector: 'app-hq',
  templateUrl: './hq.component.html',
  styleUrls: ['./hq.component.scss'],
})
export class HQComponent implements OnInit {
  displayedColumns: string[] = ['select', 'titulo', 'linkDetalhes', 'desejo'];
  dataSource = new MatTableDataSource<HQ>();
  selection = new SelectionModel<HQ>(true, []);
  hqs: HQ[];
  hqsSelected: HQ[];
  formMode = 'New';
  sub: any;
  id: any;
  titulo: any;
  entryForm: FormGroup;
  error: string | undefined;
  hq: HQ;
  desejo: HQ;
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
  isLoadingDesejo = false;
  spinner: any;
  capa: string;
  voltarHqAvancado: boolean = false;
  voltarHqLeitura: boolean = false;
  rotaBotaoVoltar: any;
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
  ) {
    this.usuarioLogado = localStorage.getItem('logado');

    if (this.usuarioLogado === 'false') {
      this.router.navigateByUrl('/login');
    }

    this.createForm();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: HQ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.linkDetalhes + 1}`;
  }

  desejoCreate(desejo: HQ) {
    this.isLoadingDesejo = true;
    this.desejo = desejo;
    this.createDesejo(this.desejo);
  }

  consoleLogEditora(nomeEditora: any) {
    this.selectedEditora = nomeEditora;
    //console.log('curent editora is ' + this.selectedEditora);
  }

  consoleLogCategoria(newValue: any) {
    //console.log('curent categoria is ' + this.selectedCategoria);
  }

  consoleLogGenero(valor: any) {
    //console.log('curent genero is ' + this.selectedGenero);
  }

  consoleLogStatus(valor1: any) {
    //console.log('curent status is ' + this.selectedStatus);
  }

  consoleLogFormato(valor1: any) {
    //console.log('curent formato is ' + this.selectedFormato);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.rotaBotaoVoltar = params['rota'];

      console.log(this.rotaBotaoVoltar);

      //VOLTA PARA A TELA DE LISTA DE HQS
      if (this.id !== undefined) {
        this.read(this.route.snapshot.paramMap.get('id'));
        this.formMode = 'Edit';
        this.voltarHqAvancado = false;
        this.voltarHqLeitura = false;
      } else {
        this.isAddNew = true;
        this.formMode = 'New';
      }

      //VOLTA PARA A TELA DE BUSCA AVANCADA
      if (this.rotaBotaoVoltar !== undefined) {
        if (this.rotaBotaoVoltar === 'Leitura') {
          this.read(this.route.snapshot.paramMap.get('id'));
          this.formMode = 'Edit';
          this.voltarHqLeitura = true;
        }
        if (this.rotaBotaoVoltar === 'BuscaAvancada') {
          this.read(this.route.snapshot.paramMap.get('id'));
          this.formMode = 'Edit';
          this.voltarHqAvancado = true;
        }
      }
    });

    this.loadEditora();
    this.loadGenero();
    this.loadCategoria();
    this.loadStatus();
    this.loadFormatos();
    this.loadLido();
    //this.generos = this.constants.generos;
    //this.categorias = this.constants.categorias;
    this.readyToCreate = false;
    this.spinner = false;
    //log.debug('ngOnInit:', this.id);
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
  onCreate() {
    this.isLoadingCreate = true;
    this.hqsSelected = this.selection.selected;
    this.create(this.hqsSelected);
  }

  // Handle Create button click
  onSearch() {
    this.readyToCreate = true;
    this.isLoading = true;
    this.searchInWeb(
      this.entryForm.get('titulo').value,
      this.entryForm.get('anoLancamento').value,
      this.entryForm.get('numeroEdicao').value,
      this.selectedEditora,
      this.selectedCategoria,
      this.selectedGenero,
      this.selectedStatus,
      this.selectedFormato
    );
  }

  // Handle Update button click
  onUpdate() {
    this.put(this.entryForm.get('id').value, this.entryForm.value);
    this.showSuccess('Sucesso!', 'HQ atualizada');
    this.router.navigateByUrl('/listahq');
  }

  // Handle Delete button click
  onDelete() {
    this.confirmationDialogService
      .confirm('Excluir HQ', 'Tem certeza que deseja excluir ?')
      .then((confirmed) => {
        if (confirmed) {
          this.delete(this.entryForm.get('id').value);
          log.debug('onDelete: ', this.entryForm.value);
        }
      })
      .catch(() => {
        log.debug('onDelete: ', 'Cancel');
      });
  }

  searchInWeb(
    titulo: any,
    anoLancamento: any,
    numeroEdicao: any,
    editora: any,
    categoria: any,
    genero: any,
    status: any,
    formato: any
  ): void {
    this.readyToCreate = true;

    this.isLoading = true;

    if (categoria == undefined || categoria == null) categoria = 0;

    if (genero == undefined || genero == null) genero = 0;

    if (status == undefined || status == null) status = 0;

    if (formato == undefined || formato == null) formato = 0;

    if (anoLancamento == '' || anoLancamento == null) anoLancamento = null;

    if (numeroEdicao == '' || numeroEdicao == null) numeroEdicao = 0;

    this.apiHttpService
      .get(
        this.apiEndpointsService.getHQInWebEndpoint(
          titulo,
          anoLancamento,
          numeroEdicao,
          editora,
          categoria,
          genero,
          status,
          formato
        ),
        titulo
      )
      .subscribe(
        (resp: DataTablesResponse) => {
          this.hqs = resp.data;
          this.isLoading = false;
          //console.log(this.hqs);
          this.dataSource = new MatTableDataSource(this.hqs);
        },
        (error) => (this.isLoading = false)
      );
  }

  // CRUD > Read, map to REST/HTTP GET
  read(id: any): void {
    this.apiHttpService.get(this.apiEndpointsService.getHQByIdEndpoint(id), id).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponseHQ) => {
        //Assign data to class-level model object.
        this.hq = resp.data;
        this.capa = this.hq.capa;
        //Populate reactive form controls with model object properties.
        this.entryForm.setValue({
          id: this.hq.id,
          titulo: this.hq.titulo,
          editora: this.hq.editora,
          genero: this.hq.genero,
          anoLancamento: '',
          numeroEdicao: this.hq.numeroEdicao,
          categoria: this.hq.categoria,
          status: this.hq.status,
          formato: this.hq.formato,
          lido: this.hq.lido,
          licenciador: this.hq.licenciador,
          numeroPaginas: this.hq.numeroPaginas,
          preco: this.hq.preco,
          dtPublicacao: this.hq.dataPublicacao,
          personagens: this.hq.personagens,
          roteiro: this.hq.desenhosRoteirosArteFinalCores,
          //genero: this.generos
        });
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // CRUD > Delete, map to REST/HTTP DELETE
  delete(id: any): void {
    this.apiHttpService.delete(this.apiEndpointsService.deleteHQByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        this.showSuccess('Sucesso!', 'HQ excluida');
        this.router.navigateByUrl('/listahq');
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // CRUD > Create, map to REST/HTTP POST
  create(data: any): void {
    this.apiHttpService.post(this.apiEndpointsService.postHQEndpoint(), data).subscribe((resp: DataResponseHQ) => {
      this.hq = resp.data; //guid return in data
      if (resp.succeeded) {
        this.isLoadingCreate = false;
        this.showSuccess('Sucesso!', 'HQ(s) cadastrada(s)');
        //this.entryForm.reset();
        //this.selection.clear();
      } else {
        this.showError('Erro!', resp.message);
        this.isLoadingCreate = false;
      }
      //this.entryForm.reset();
    });
  }

  // CRUD > Create, map to REST/HTTP POST
  createDesejo(data: any): void {
    this.apiHttpService.post(this.apiEndpointsService.postDesejoEndpoint(), data).subscribe((resp: DataResponseHQ) => {
      this.hq = resp.data; //guid return in data
      if (resp.succeeded) {
        this.isLoadingDesejo = false;
        this.showSuccess('Sucesso!', 'HQ cadastrada na lista de desejo');
        //this.entryForm.reset();
        //this.selection.clear();
      } else {
        this.showError('Erro!', resp.message);
        this.isLoadingDesejo = false;
      }
      //this.entryForm.reset();
    });
  }

  // CRUD > Update, map to REST/HTTP PUT
  put(id: string, data: any): void {
    this.apiHttpService.put(this.apiEndpointsService.putHQPagedEndpoint(id), data).subscribe((resp: any) => {
      this.id = resp.data; //guid return in data
    });
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      anoLancamento: [''],
      numeroEdicao: [''],
      genero: [''],
      categoria: [''],
      status: [''],
      formato: [''],
      lido: [''],
      licenciador: [''],
      numeroPaginas: [''],
      preco: [''],
      dtPublicacao: [''],
      personagens: [''],
      roteiro: [''],
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
      delay: 10000,
      autohide: false,
      headertext: headerText,
    });
  }
}
