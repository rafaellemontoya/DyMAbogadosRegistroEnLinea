import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/interfaces/participante.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nuevo-participante',
  templateUrl: './nuevo-participante.component.html',
  styleUrls: ['./nuevo-participante.component.css']
})
export class NuevoParticipanteComponent implements OnInit {


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
        this.http.post('https://www.themyt.com/imef2021/backend/insertar_registro_sitio.php', this.participante).subscribe((data: any) => {
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
    this.http.post('https://www.themyt.com/imef2021/backend/logout.php', dataenviada).subscribe((data: any) => {
      if (data.respuesta === 1) {
        this.router.navigate(['login']);
      }
    });
  }

  generarPDF(id) {
    window.scroll(0, 0);
    const asistente = new Participante();
    asistente.id = Number(id);

    this.http.post('https://www.themyt.com/imef2021/backend/generarPDF_ipad.php', asistente)
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

    this.http.post('backend/imprimir_printnode_ipad1.php', asistente)
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
