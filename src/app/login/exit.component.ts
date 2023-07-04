import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@app/login/token-storage.service';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataResponse } from '@shared/classes/data-response';
import { Logger } from '@core';
import { ToastService } from '@app/services/toast.service';
import { Router } from '@angular/router';

const log = new Logger('Exit');

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
})
export class ExitComponent implements OnInit {
  existeUsuario: any;

  constructor(
    private tokenStorage: TokenStorageService,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.existeUsuario = false;
    localStorage.setItem('logado', this.existeUsuario);
    //console.log('curent status is Exit ' + this.existeUsuario);
    this.router.navigateByUrl('/login');
  }
}
