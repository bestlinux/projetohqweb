import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  mostrarCabecalho: boolean = false;
  existeUsuario: any;

  constructor(private router: Router) {
    if (this.existeUsuario == undefined) {
      this.mostrarCabecalho = true;
    }

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          //console.log("this.existeUsuario login" + this.existeUsuario )
          this.existeUsuario = false;
          localStorage.setItem('logado', this.existeUsuario);
          this.mostrarCabecalho = false;
        } else {
          //console.log("this.existeUsuario " + this.existeUsuario )
          this.existeUsuario = true;
          localStorage.setItem('logado', this.existeUsuario);
          this.mostrarCabecalho = true;
        }
      }
    });
  }

  ngOnInit() {}
}
