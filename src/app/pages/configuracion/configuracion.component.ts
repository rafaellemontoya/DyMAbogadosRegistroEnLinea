import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared.service';
import { Participante } from '../../interfaces/participante.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  noImpresora = 0;
  constructor(public shared: SharedService, private http: HttpClient) { }

  ngOnInit() {
  }

  setNumeroImpresora() {
    localStorage.setItem('noImpresora', this.noImpresora.toString());
    Swal.fire(

      'Guardado con éxito!',
      '',
      'success'
    );
  }

  probarImpresora() {
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
      ).then(d => {


      });

    const asistente = new Participante();
    asistente.id = 999;
    asistente.noImpresora = this.noImpresora.toString();
    console.log(asistente);
    this.http.post('backend/imprimir_printnode_ipad1.php', asistente)
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
