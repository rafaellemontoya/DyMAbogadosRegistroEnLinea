import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filtroEmpresa'
})
export class FiltroEmpresaPipe implements PipeTransform {
    transform(array: any[], terminoBusqueda: string) {
        if (!array || !terminoBusqueda) {
            return array;
        }
        return array.filter(asistente =>

            String(asistente.empresa).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
    }
}
