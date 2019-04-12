import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehiculoService } from '../../servicio/VehiculoService';

import { RespuestaError } from './RespuestaError';
import { Vehiculo } from 'src/dominio/Vehiculo';
import { Entrada } from 'src/dominio/Entrada';
import { TipoVehiculo } from 'src/constantes';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css'],
  providers: [VehiculoService]
})
export class RegistrarVehiculoComponent implements OnInit {

  tipoCarro: boolean;
  tipoMoto: boolean;
  public vehiculo: Vehiculo;
 
  
  tiposVehiculo: any[] = TipoVehiculo;
  entradas: Entrada[];
  tipoVehiculo : string;
  filtros: any = {
    tipo: '',
    placa: '',
    activo:true
  }

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;


  constructor(private vehiculoService: VehiculoService) {
    this.vehiculo = new Vehiculo('', '', '', '');
    this.tipoCarro = false;
    this.tipoMoto = false;


  }
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  public changeSuccessMessage() {
    this._success.next("Registro exitoso...!");
  }

  onChange(deviceValue) {
    if (deviceValue =="CARRO") {
      console.log(deviceValue);
      this.tipoCarro = true;
      this.tipoMoto = false;
    } else {
      this.tipoCarro = false;
      this.tipoMoto = true;
     
    }

  }


  onSubmit() {
 
    this.vehiculoService.registrarVehiculo(this.vehiculo).subscribe(
      (responseVehiculo) => {
       
        this.vehiculo = responseVehiculo;
        console.log(responseVehiculo);
        this.vehiculoService.registrarEntrada(responseVehiculo).subscribe(
          (responseEntrada) => {
            console.log(responseEntrada);
            this.changeSuccessMessage();
          },
          (errorEntrada) => {
            this._success.next(errorEntrada.error.mensaje);
      
          }

        )
      },
      (error) => {
        console.log(error);
    
        this._success.next(error.error.mensaje);
       
      }
    )


  }




}




