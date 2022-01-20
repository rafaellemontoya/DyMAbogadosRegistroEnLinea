import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Participante } from 'src/app/interfaces/participante.interface';

import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  participante: Participante;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.participante = new Participante();
   }

  ngOnInit() {

  }
  crearRegistro(participante: Participante) {
    (document.getElementById('guardarbtn') as HTMLButtonElement).disabled = true;
    

    console.log(this.participante);
    this.http.post('https://www.e-eventos.com/cbm/enp20/backend/insertar_admin.php', participante ).subscribe(
      (data: any) => {
        console.log(data);
        if (data.respuesta === 1) {
          this.participante = new Participante();
          Swal.fire({
            title: 'Apreciable ' + data.nombre,
            html: 'Has quedado pre-registrado(a) al <b>Evento Nacional de Premiación 2020</b>.',
  
    icon: 'success',
  
    focusConfirm: false,
    confirmButtonText:
      'Aceptar'
            }).then((result) => {
              if (result.value) {
                window.location.href = 'https://www.e-eventos.com/cbm/enp20/index.php#';

              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al realizar el registro',
            text: 'Por favor evita usar caracteres especiales e inténtalo nuevamente',
           
          });
        }
  });

}
}
