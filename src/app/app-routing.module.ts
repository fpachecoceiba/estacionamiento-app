import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarVehiculoComponent } from './registrar-vehiculo/registrar-vehiculo.component';

const routes: Routes = [
  { 
    path:"registrar-vehiculo",
    component:RegistrarVehiculoComponent

  },
  { 
    path:"registrar-vehiculo/:tipo  ",
    component:RegistrarVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
