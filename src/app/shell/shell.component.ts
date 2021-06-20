import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute,NavigationStart  } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  
  mostrarCabecalho: boolean;
  existeUsuario: any;
  
  constructor(private router: Router) 
  {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.existeUsuario = false;
          localStorage.setItem('logado', this.existeUsuario);
          this.mostrarCabecalho = false;
        } else {
          // console.log("NU")
          this.existeUsuario = true;
          localStorage.setItem('logado', this.existeUsuario);
          this.mostrarCabecalho = true;
        }
      }
    });
  }
  
  ngOnInit() 
  {
   
  }
}
