import { Entrada } from './Entrada';

export class Salida {
    constructor(
        public idSalida,
        public fechaSalida,
        public valor,
        public entradaParqueo:Entrada
    ){}
}