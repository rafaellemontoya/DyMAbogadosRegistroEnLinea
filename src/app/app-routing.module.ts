import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { VerRegistroComponent } from './pages/ver-registro/ver-registro.component';
import { EditarRegistroComponent } from './pages/editar-registro/editar-registro.component';
import { VerParticipanteComponent } from './pages/ver-participante/ver-participante.component';
import { CodigosPromoComponent } from './pages/codigos-promo/codigos-promo.component';
import { AgregarDatosFacturaComponent } from './pages/agregar-datos-factura/agregar-datos-factura.component';
import { NuevaCortesiaComponent } from './pages/nueva-cortesia/nueva-cortesia.component';
import { NuevaPrensaComponent } from './pages/nueva-prensa/nueva-prensa.component';
import { NuevoParticipanteComponent } from './pages/nuevo-participante/nuevo-participante.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { VerAcompanantesComponent } from './pages/ver-acompanantes/ver-acompanantes.component';
import { NuevoAcompananteComponent } from './pages/nuevo-acompanante/nuevo-acompanante.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [{path: '', component: InicioComponent },
{path: 'login', component: LoginComponent },
{path: 'ver-registro', component: VerRegistroComponent },
{path: 'ver-acompanantes', component: VerAcompanantesComponent },
{path: 'editar-registro/:id', component: EditarRegistroComponent },
{path: 'ver-participante/:id', component: VerParticipanteComponent },
{path: 'codigos-descuento', component: CodigosPromoComponent },
{path: 'agregar-datos-factura', component: AgregarDatosFacturaComponent },
{path: 'nueva-cortesia', component: NuevaCortesiaComponent },
{path: 'nueva-prensa', component: NuevaPrensaComponent },
{path: 'nuevo-participante', component: NuevoParticipanteComponent },
{path: 'nuevo-acompanante', component: NuevoAcompananteComponent },
{path: 'configuracion', component: ConfiguracionComponent },
{path: 'inicio', component: InicioComponent },

{ path: '**', pathMatch: 'full', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
