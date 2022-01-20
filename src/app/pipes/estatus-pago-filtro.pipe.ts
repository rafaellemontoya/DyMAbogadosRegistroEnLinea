import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filtroEstatusPago'
})
export class FiltroEstatusPagoPipe implements PipeTransform {
    transform(array: any[], terminoBusqueda: string) {
        if (!array || !terminoBusqueda) {
            return array;
        }
        return array.filter(asistente =>

            this.convertir(asistente.status_registro).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
    }
    convertir(formaPago: string) {
        let texto = '-';
        switch (formaPago) {
            case '0':
                texto = 'pendiente de pago';
                break;
            case '1':
                texto = 'pagado';
                break;
        }
        console.log(texto);
        return texto;

    }
}


