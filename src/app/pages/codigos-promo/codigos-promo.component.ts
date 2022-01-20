import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigos-promo',
  templateUrl: './codigos-promo.component.html',
  styleUrls: ['./codigos-promo.component.css']
})
export class CodigosPromoComponent implements OnInit {

  items: any[];
  usersJson: any[];
  terminoBusquedaNombre: string;
  terminoBusquedaApellido: string;
  terminoBusquedaId: string;
  terminoBusquedaPedido: string;
  terminoBusquedaEmpresa: string;
  terminoBusquedaTipo: string;
  imprimiendo = false;
  user: User;

  preguntaEliminar = false;
  estadoEliminado = false;
  idEliminar = '';
  nombreEliminar = '';

  estadoImprimiendo = false;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // this.isLoggedIn();
    this.getInfo();
    }

  getInfo() {
    this.http.get('https://www.e-eventos.com/dymabogados/backend/obtener_codigos.php').subscribe((data: any) => {
      console.log(data);
      // tslint:disable-next-line:no-string-literal
      // this.items = data;
      this.usersJson = Array.of(data);
      console.log (this.usersJson);
    });
  }

  isLoggedIn() {
    const requestcode = 'bs19';
    this.http.post('https://www.e-eventos.com/dymabogados/backend/isLoggedIn.php', requestcode ).subscribe((data: any) => {
      console.log(data);
      if (data.response === '1') {
        // this.obtenerAsistencia();
        this.getInfo();
      } else {
        this.router.navigate(['login']);
      }
    } );
  }
  getTextoEstado(id): string {
    switch (id) {
      case '-1':
        return 'Rechazado';
        break;
        case '0':
          return 'Sin canjear ';
          break;
        case '1':
          return 'Canjeado';
          break;
          case '2':
            return 'Aceptado (Cortesia)';
            break;
            case '3':
              return 'Pendiente de ';
              break;
    }
  }
  getClaseEstado(id): string{
    switch (id) {
      case '-1':
        return 'text-warning';
        break;
        case '0':
          return 'text-success';
          break;
        case '1':
          return 'text-danger';
          break;
          case '2':
            return 'text-success';
            case '3':
              return 'text-warning';

    }
  }

  logout() {
    const dataenviada = '';
    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/logout.php', dataenviada).subscribe((data: any) => {
      if (data.respuesta === 1) {
        this.router.navigate(['login']);
      }
    });
  }

}
