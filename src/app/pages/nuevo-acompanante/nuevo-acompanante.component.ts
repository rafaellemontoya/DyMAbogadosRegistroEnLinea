import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participante } from 'src/app/interfaces/participante.interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nuevo-acompanante',
  templateUrl: './nuevo-acompanante.component.html',
  styleUrls: ['./nuevo-acompanante.component.css']
})
export class NuevoAcompananteComponent implements OnInit {

  participante = new Participante();

  constructor(private http: HttpClient, private router: Router, private location: Location, public shared: SharedService) { }

  ngOnInit() {
    // this.participante.formaPago = '4';
    // this.participante.codigoDescuento = '0';
  }

  guardarCortesia() {
    console.log(this.participante);
    Swal.fire({
      title: '¿Estás seguro de querer guardar?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {


        // tslint:disable-next-line:max-line-length
        this.http.post('https://www.themyt.com/imef2021/backend/insertar_registro_acompanante.php', this.participante).subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {
        this.participante = new Participante();

        // this.participante.formaPago = '4';
        // this.participante.codigoDescuento = '0';
        this.generarPDF(data.id);
        Swal.fire({
          icon: 'success',
          title: 'Cortesía creada con éxito'

        });
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

  generarPDF(id) {
    window.scroll(0, 0);
    const asistente = new Participante();
    asistente.id = Number(id);

    this.http.post('https://www.themyt.com/imef2021/backend/generarPDF_acompanante.php', asistente)
          .subscribe((data: any) => {
            console.log(data);
            if (data.estado_respuesta === 1) {
              this.imprimirPDF(asistente);
              Swal.fire(

                'impresión con éxito!',
                '',
                'success'
              );
            }
          });
  }
  imprimirPDF(asistente: Participante) {

    asistente.noImpresora = this.shared.getNoImpresora();
    this.http.post('backend/imprimir_printnode_acompanantes.php', asistente)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'impresión con éxito!',
                '',
                'success'
              ).then(a => {
                this.location.back();
              });
            }
          });
  }

}
