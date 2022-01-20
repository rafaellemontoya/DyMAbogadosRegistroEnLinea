import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filtroNombre'
})
export class FiltroNombrePipe implements PipeTransform {
    transform(array: any[], terminoBusqueda: string) {
        if (!array || !terminoBusqueda) {
            return array;
        }
        return array.filter(asistente =>

            String(asistente.nombre).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
    }
}
