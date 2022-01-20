import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SideComponent } from './shared/side/side.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { VerRegistroComponent } from './pages/ver-registro/ver-registro.component';
import { EditarRegistroComponent } from './pages/editar-registro/editar-registro.component';
import { VerParticipanteComponent } from './pages/ver-participante/ver-participante.component';
import { SegundoPasoComponent } from './pages/segundo-paso/segundo-paso.component';
import { CodigosPromoComponent } from './pages/codigos-promo/codigos-promo.component';
import { FiltroNombrePipe } from './pipes/nombre-filter.pipe';
import { FiltroApellidoPipe } from './pipes/apellido-filter.pipe';
import { FiltroEmpresaPipe } from './pipes/empresa-filtro.pipe';
import { FiltroFormaPagoPipe } from './pipes/forma-pago-filtro.pipe';
import { FiltroEstatusPagoPipe } from './pipes/estatus-pago-filtro.pipe';
import { AgregarDatosFacturaComponent } from './pages/agregar-datos-factura/agregar-datos-factura.component';
import { NuevaCortesiaComponent } from './pages/nueva-cortesia/nueva-cortesia.component';
import { NuevaPrensaComponent } from './pages/nueva-prensa/nueva-prensa.component';
import { NuevoParticipanteComponent } from './pages/nuevo-participante/nuevo-participante.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { VerAcompanantesComponent } from './pages/ver-acompanantes/ver-acompanantes.component';
import { NuevoAcompananteComponent } from './pages/nuevo-acompanante/nuevo-acompanante.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistroComponent,
    SideComponent,
    FooterComponent,
    LoginComponent,
    VerRegistroComponent,
    EditarRegistroComponent,
    VerParticipanteComponent,
    SegundoPasoComponent,
    CodigosPromoComponent,
    FiltroNombrePipe,
    FiltroApellidoPipe,
    FiltroEmpresaPipe,
    FiltroFormaPagoPipe,
    FiltroEstatusPagoPipe,
    AgregarDatosFacturaComponent,
    NuevaCortesiaComponent,
    NuevaPrensaComponent,
    NuevoParticipanteComponent,
    InicioComponent,
    VerAcompanantesComponent,
    NuevoAcompananteComponent,
    ConfiguracionComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
