import { Component, OnInit } from '@angular/core';
import { TipoVehiculo } from 'src/constantes';
import { VehiculoService } from 'src/servicio/VehiculoService';
import { Entrada } from 'src/dominio/Entrada';
import { Vehiculo } from 'src/dominio/Vehiculo';


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Salida } from 'src/dominio/salida';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrls: ['./listar-vehiculo.component.css']
})
export class ListarVehiculoComponent implements OnInit {

  closeResult: string;

  tiposVehiculo: any[] = TipoVehiculo;
  entradas: Entrada[];
  salida : Salida;
  tipoCarro:boolean;
  tipoMoto:boolean;

  filtros: any = {
    tipo: '',
    placa: '',
    activo:true
  }

  constructor(private vehiculoService: VehiculoService, private modalService: NgbModal) { 

    this.getEntrada();
  }

  ngOnInit() {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getEntrada() {
    this.vehiculoService.getEntrada(this.filtros).subscribe(
      (response) => {
        this.entradas = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  registrarSalida(vehiculo, content) {
    this.vehiculoService.registrarSalida(vehiculo).subscribe(
      res => {
       
        this.salida = res;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.getEntrada();
      }
      
    )
  }


  VerSalida(vehiculo, content) {
    this.vehiculoService.consultarSalida(vehiculo).subscribe(
      res => {
        
        this.salida = res[0];
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      
      }
      
    )
  }


}
