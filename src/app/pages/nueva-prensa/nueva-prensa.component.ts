import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/interfaces/participante.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-prensa',
  templateUrl: './nueva-prensa.component.html',
  styleUrls: ['./nueva-prensa.component.css']
})
export class NuevaPrensaComponent implements OnInit {

  participante = new Participante();
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  guardarCortesia() {
    console.log(this.participante);
    Swal.fire({
      title: '¿Estás seguro de querer guardar?',
      text: 'Se enviará un correo a la persona que registraste',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {

        this.http.post('https://www.e-eventos.com/dymabogados/backend/insertar_prensa.php', this.participante).subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {
        this.participante = new Participante();
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

    this.http.post('https://www.e-eventos.com/dymabogados/backend/generarPDF_ipad.php', asistente)
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

    this.http.post('https://www.e-eventos.com/dymabogados/backend/imprimir_printnode_ipad1.php', asistente)
          .subscribe((data: any) => {
            console.log(data);
            if (data.respuesta === 1) {
              Swal.fire(

                'impresión con éxito!',
                '',
                'success'
              );
            }
          });
  }

}
