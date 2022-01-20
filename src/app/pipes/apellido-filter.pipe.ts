import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filtroApellido'
})
export class FiltroApellidoPipe implements PipeTransform {
    transform(array: any[], terminoBusqueda: string) {
        if (!array || !terminoBusqueda) {
            return array;
        }
        return array.filter(asistente =>

            String(asistente.apellido).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
    }
}
