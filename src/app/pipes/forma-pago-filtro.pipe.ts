import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filtroFormaPago'
})
export class FiltroFormaPagoPipe implements PipeTransform {
    transform(array: any[], terminoBusqueda: string) {
        if (!array || !terminoBusqueda) {
            return array;
        }
        return array.filter(asistente =>

            this.convertir(asistente.forma_pago).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
    }
    convertir(formaPago: string) {
        let texto = '-';
        switch (formaPago) {
            case '1':
                texto = 'paypal';
                break;
            case '2':
                texto = 'transferencia';
                break;
        }
        console.log(texto);
        return texto;

    }
}


