import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../login/token-storage.service';
import { ApiHttpService } from '../services/api-http.service';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { DataResponse } from '../@shared/classes/data-response';
import { Logger } from '../@core';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  existeUsuario: any;
  form!: UntypedFormGroup;
  isLoading = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public toastService: ToastService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.existeUsuario = false;
    localStorage.setItem('logado', this.existeUsuario);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form.value;
    this.isLoading = true;
    this.login(username, password);
  }

  login(usuario: any, senha: any): void {
    this.apiHttpService.get(this.apiEndpointsService.getLoginQueryEndpoint(usuario, senha), usuario).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponse) => {
        //Assign data to class-level model object.
        this.existeUsuario = resp.data;

        if (this.existeUsuario == true) {
          this.isLoading = false;
          localStorage.setItem('logado', this.existeUsuario);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          //this.reloadPage();
          this.router.navigateByUrl('/home');
        } else {
          this.showError('Erro!', 'Falha ao realizar o login');
          this.isLoading = false;
          this.isLoginFailed = true;
        }
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
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
  // reactive form
  private createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
