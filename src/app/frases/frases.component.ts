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

  constructor(
    public toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.createForm();
  }

  ngOnInit() {
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
    log.debug('ngOnInit:', this.id);
  }

  imageInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    const formData = new FormData();

    formData.append(this.file.name, this.file);

    const uploadReq = new HttpRequest('POST', this.apiEndpointsService.postImageUploadEndpoint(), formData, {
      reportProgress: true,
    });

    this.apiHttpService.request(uploadReq).subscribe((resp: any) => {
      if (resp.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * resp.loaded) / resp.total);
      } else if (resp.type === HttpEventType.Response) {
        this.progress = 0;
        this.showSuccess('Sucesso!', 'Upload da imagem feito com sucesso');
      }
    });
  }

  // reactive form
  private createForm() {
    this.entryFormFrases = this.formBuilder.group({
      id: [''],
      arquivo: ['', Validators.required],
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
