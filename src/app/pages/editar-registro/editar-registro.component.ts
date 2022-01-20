import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Participante } from 'src/app/interfaces/participante.interface';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit {

  constructor( private route: ActivatedRoute, private http: HttpClient, private location: Location, private router: Router ) { }

  idRecibido = 0;
  participante = new Participante();
  guardado = false;
  correoEnviado = false;

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
    // this.obtenerInformacion(parametros['id']);

});
  }

  guardarParticipante() {


    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/editar_participane_admin.php', this.participante)
    .subscribe((data: any) => {
      console.log(data);
      if (data.respuesta === 1) {
        if (data.respuesta === 1) {
          this.participante = new Participante();
          Swal.fire({
            title: 'Registro editado con éxito' ,
            html: 'Se han guardado los cambios.',
  
    icon: 'success',
  
    focusConfirm: false,
    confirmButtonText:
      'Aceptar'
            }).then((result) => {
              if (result.value) {
                this.router.navigate(['ver-registro']);

              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al realizar el registro',
            text: 'Por favor evita usar caracteres especiales e inténtalo nuevamente',

          });
        }

      }
    });

  }



  atras() {
    this.location.back();
  }
  obtenerInformacion(id: number) {
    this.participante.id = id;
    this.http.post('https://www.e-eventos.com/dymabogados/backend/obtener_participante_post.php', this.participante)
    .subscribe((data: any) => {
      console.log (data);
      this.participante.nombre = data.nombre;
      




    });
  }




}
