import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  sinPago = 0;
  pagados = 0;
  taller1 = 0;
  taller2 = 0;
  taller3 = 0;

  paypal = 0;
  transferencia = 0;
  tarjetaCredito = 0;
  efectivo = 0;
  prensa = 0;
  cortesias = 0;



  totalRegistrados = 4;
  totalAsistentes = 2;
  totalRegistro = 0;

  title = 'Talleres';
  type = 'PieChart';

  dataGraph = [
    ['Faltantes: ' + this.taller1, 3],
    ['Pagados: ' + this.taller2, 4]

 ];
 columnNames = ['Browser', 'Percentage'];
 options = {
 };
 width = 600;
 height = 400;

 myOptions = {
  colors: ['#20b3d6', '#93d08e', '#e4e35b'],
  is3D: true
};
 myOptionsAsistente = {
  colors: ['#1db2d9', '#e4e45b'],
  is3D: true,
  animation: {
    duration: 10000,
    easing: 'out',
  }
};
titleGraph = 'Pagos';
 titleGraph2 = 'Asistentes ';
 typeGraph2 = 'PieChart';
 dataGraph2 = [
   ['Asistentes', 3 ],
   ['Registrados', 4],

];

columnNamesGraph2 = ['Browser', 'Personas'];
optionsGraph2 = {
};
widthGraph2 = 600;
heightGraph2 = 400;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerAsistencia();
    // this.obtenerPago();
    // this.obtenerFormasPago();
  }
  loadDataGraph1(taller1: number, taller2: number, taller3: number) {
    this.dataGraph2 = [
      ['Registrados', taller1],
      ['Asistentes', taller2],

   ];
  }
  obtenerAsistencia() {
    this.http.get('https://www.themyt.com/imef2021/backend/obtener_cuenta_participantes.php').subscribe((data: any) => {
      console.log(data);

      // tslint:disable-next-line:radix
      const registrados = parseInt(data.registados);
      this.totalRegistrados = data.registados;
      // tslint:disable-next-line:radix
      const asistentes = parseInt(data.asistentes);
      this.totalAsistentes = data.asistentes;
      // tslint:disable-next-line:radix
      const total = parseInt(data.total);
      this.totalRegistro = data.total;
      this.loadDataGraph1(registrados, asistentes, total );
    });
  }

  loadDataGraph2(taller1: number, taller2: number) {
    this.dataGraph = [
      ['Faltantes', taller1],
      ['Pagados', taller2],

   ];
  }
  obtenerPago() {
    this.http.get('https://www.e-eventos.com/dymabogados/backend/obtener_cuenta_pago.php').subscribe((data) => {
      console.log(data);

      // tslint:disable-next-line:radix
      const pagados = parseInt(data['pagados']);
      this.pagados = data['pagados'];
      // tslint:disable-next-line:radix
      const faltantes = parseInt(data['faltantes']);
      this.sinPago = data['faltantes'];
      const total = parseInt(data['total']);
      this.totalRegistro = data['total'];
      this.loadDataGraph2(faltantes, pagados );
    });
  }
  obtenerFormasPago() {
    this.http.get('https://www.e-eventos.com/dymabogados/backend/obtener_forma_pago.php').subscribe((data) => {
      console.log(data);

      // tslint:disable-next-line:radix

      this.paypal = data['paypal'];
      // tslint:disable-next-line:radix

      this.transferencia = data['transferencia'];

      this.tarjetaCredito = data['tarjetaCredito'];
      this.efectivo = data['efectivo'];
      this.prensa = data['prensa'];
      this.cortesias = data['cortesias'];

    });
  }
}
