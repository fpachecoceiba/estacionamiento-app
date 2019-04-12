import { Vehiculo } from './Vehiculo';

export class Entrada {
    constructor(
        public idEntrada,
        public fechaEntrada,
        public activo:boolean,
        public cilindraje,
        public vehiculo: Vehiculo
    ){}
}