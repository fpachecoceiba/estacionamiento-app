import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GLOBAL } from '../constantes/GLOBAL';

import { Observable } from 'rxjs';
import { Vehiculo } from 'src/dominio/Vehiculo';



@Injectable()
export class VehiculoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }


    registrarVehiculo(vehiculo: Vehiculo): Observable<any> {
        const body = JSON.stringify(vehiculo);
        const headers = new HttpHeaders().set('Content-type', 'application/json');
        if (vehiculo.tipoVehiculo == "CARRO") {
            return this._http.post(this.url + 'apiv1/vehiculos/carros', body, { headers: headers });
        } else {
            return this._http.post(this.url + 'apiv1/vehiculos/motos', body, { headers: headers });
        }
    }

    registrarEntrada(vehiculo: Vehiculo): Observable<any> {
        const body = JSON.stringify(vehiculo);
        const headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'apiv1/entradas', body, { headers: headers });

    }


    getEntrada(filtros): Observable<any> {
        let params = new HttpParams();
        if (filtros.tipo != null && filtros.tipo != '') {
            params = params.append('tipo', filtros.tipo);
        }

        if (filtros.placa != null && filtros.placa != '') {
            params = params.append('placa', filtros.placa);
        }


        params = params.append('activo', filtros.activo);

        const headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'apiv1/entradas', { headers, params: params });
    }

    registrarSalida(vehiculo: Vehiculo): Observable<any> {
        const body = JSON.stringify(vehiculo);
        const headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'apiv1/salidas', body, { headers: headers });

    }

    consultarSalida(placa): Observable<any> {
        let params = new HttpParams();
        params = params.append('placa', placa);
        const headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'apiv1/salidas', { headers, params: params });

    }







}


