import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participante } from 'src/app/interfaces/participante.interface';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-ver-acompanantes',
  templateUrl: './ver-acompanantes.component.html',
  styleUrls: ['./ver-acompanantes.component.css']
})
export class VerAcompanantesComponent implements OnInit {

  items: any[];
  usersJson: any[];
  terminoBusquedaNombre: string;
  terminoBusquedaApellido: string;
  terminoBusquedaId: string;
  terminoBusquedaPedido: string;
  terminoBusquedaEmpresa: string;
  terminoFormaPago: string;
  terminoBusquedaEstatusPago: string;
  imprimiendo = false;
  user: User;

  preguntaEliminar = false;
  estadoEliminado = false;
  idEliminar = '';
  nombreEliminar = '';

  estadoImprimiendo = false;


  constructor(private http: HttpClient, private router: Router, public shared: SharedService) { }

  ngOnInit() {
    // this.isLoggedIn();
    customInitFunctions();
    this.getInfo();
    }

  getInfo() {
    this.http.get('https://www.themyt.com/imef2021/backend/obtener_todos_acompanantes.php').subscribe((data: any) => {
      console.log(data);
      // tslint:disable-next-line:no-string-literal
      // this.items = data;
      this.usersJson = data;
      // console.log (this.usersJson);
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

  preguntarEliminar(id, nombre) {

    window.scroll(0, 0);
    this.preguntaEliminar = true;
    this.idEliminar = id;
    console.log(this.idEliminar);
    this.nombreEliminar = nombre;

  }


  rechazar(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);

    Swal.fire({
      title: 'Estás seguro de querer rechazarlo?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/rechazar_participante.php', participante)
          .subscribe((data: any) => {
            if (data.respuesta === 1) {

              console.log(data);
              this.getInfo();
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido rechazado.',
                'success'
              );
            }
          });

      }
    });

  }

  aceptarEfectivo(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de querer aceptarlo?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/dymabogados/backend/aceptar_participante_efectivo.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              this.generarPDF(id);
              Swal.fire(

                'Acción realizada correctamente!',
                'El estatus ha sido cambiado a pagado.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  aceptarTarjeta(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de querer aceptarlo?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.http.post('https://www.e-eventos.com/dymabogados/backend/aceptar_participante_tarjeta.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              this.generarPDF(id);
              Swal.fire(

                'Acción realizada correctamente!',
                'El estatus ha sido cambiado a pagado.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  aceptarFactura(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro marcar como generada la factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/dymabogados/backend/factura_generada.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El estatus ha cambiado a Generada.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  getTextoEstadoPago(id): string {
    switch (id) {
      case '-1':
        return 'Rechazado';
        break;
        case '0':
          return 'Pendiente de asistencia';
          break;
        case '1':
          return 'Asistencia';
          break;
          case '2':
            return 'Aceptado ';
            break;
            case '3':
              return '';
              break;
    }
  }
  getClaseEstadoPago(id): string {
    switch (id) {
      case '-1':
        return 'text-warning';
        break;
        case '0':
          return 'text-danger';
          break;
        case '1':
          return 'text-success';
          break;
          case '2':
            return 'text-success';
            case '3':
              return 'text-warning';

    }
  }
  getTextoEstadoFactura(id): string {
    switch (id) {
      case '-1':
        return 'Rechazado';
        break;
        case '0':
          return 'Sin generar';
          break;
        case '1':
          return 'Generada';
          break;
          case '2':
            return 'Aceptado (Cortesia)';
            break;
            case '3':
              return 'Pendiente de pago';
              break;
    }
  }
  getClaseEstadoFactura(id): string {
    switch (id) {
      case '-1':
        return 'text-warning';
        break;
        case '0':
          return 'text-warning';
          break;
        case '1':
          return 'text-success';
          break;
          case '2':
            return 'text-success';
            case '3':
              return 'text-warning';

    }
  }
  cortesia(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de asignar Cortesía?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/cortesia_participante.php', participante)
          .subscribe((data: any) => {
            this.getInfo();
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido aceptado.',
                'success'
              );

            }
          });

      }
    });
  }
  pendientePago(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de cambiar el estado a Pendiente de pago?',
      text: 'Se enviará la notificación al correo asignado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/cbm/enp20/backend/pendiente_pago_participante.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Acción realizada correctamente!',
                'El participante ha sido aceptado.',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });
  }
  logout() {
    const dataenviada = '';
    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/logout.php', dataenviada).subscribe((data: any) => {
      if (data.respuesta === 1) {
        this.router.navigate(['login']);
      }
    });
  }
  getFormaPago(formaPago) {
    if (formaPago === '1') {
      return 'Paypal';
    } else if (formaPago === '2') {
      return 'Transferencia';
    }
  }

  eliminar(id) {
    const participante = new Participante();
    participante.id = id;
    console.log(participante);
    Swal.fire({
      title: 'Estás seguro de querer eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.post('https://www.e-eventos.com/dymabogados/backend/eliminar_participante.php', participante)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'Registro eliminado con éxito!',
                '',
                'success'
              );
              this.getInfo();
            }
          });

      }
    });

  }
  generarPDF(id) {
    console.log(this.estadoImprimiendo);
    this.imprimiendo = true;
    this.estadoImprimiendo = true;
    window.scroll(0, 0);
    const asistente = new Participante();
    asistente.id = id;
    console.log(asistente.id);

    console.log(this.estadoImprimiendo);
    this.http.post('https://www.themyt.com/imef2021/backend/generarPDF_acompanante.php', asistente)
          .subscribe((data: any) => {
            console.log(data);

            if (data.estado_respuesta === 1) {
              this.imprimirPDF(asistente);
              Swal.fire(
              {
                title: 'Mandando a imprimir',
                text: 'Espera por favor',
                imageUrl: 'https://themyt.com/loader.gif',
                imageWidth: 200,
                showConfirmButton: false,
                imageAlt: 'loading',
                allowOutsideClick: false
              }
              ).then((d: any) => {
                this.getInfo();
              });
            }
          });
  }
  imprimirPDF(asistente: Participante) {
    console.log('Imprimiendo..');
    this.estadoImprimiendo = false;
    asistente.noImpresora = this.shared.getNoImpresora();
    this.http.post('backend/imprimir_printnode_acompanantes.php', asistente)
          .subscribe((data: any) => {
            console.log(data);
            if (data.statusMessage === 'Created') {
              Swal.fire(

                'Impresión con éxito!',
                '',
                'success'
              );
            } else {
              Swal.fire(

                'Error al imprimir',
                data.statusMessage,
                'error'
              );
            }
          });
  }

}
