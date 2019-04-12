import { IngresoVehiculoPage } from "./ingreso-vehiculo.po";

describe('workspace-project App -> Ingreso Vehiculo', () => {
    let page: IngresoVehiculoPage;

    beforeEach(() => {
        page = new IngresoVehiculoPage();
    });
    it('test h4', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Registro Vehiculo');
      });
    
  

    it('should display reset vehiculo click!', async () => {
        page.navigateTo();
        page.fillDataCarro();

        expect(page.getValorInputModelo()).toBe(page.dataVehiculo.modelo)
        expect(page.getValorInputPlaca()).toBe(page.dataVehiculo.placa)
        
        page.getBotonCancelar().click().then(res => {
            expect(page.getValorInputPlaca()).toBe('');
            expect(page.getValorInputModelo()).toBe('');
        })

    });
    it('should display ingreso carro click!', async () => {
        page.navigateTo();
        page.fillDataCarro();

        expect(page.getValorInputModelo()).toBe(page.dataVehiculo.modelo)
        expect(page.getValorInputPlaca()).toBe(page.dataVehiculo.placa)

        page.getBotonRegistrar().click().then(res => {
            expect(page.getBotonRegistrar().getText()).toBe('Guardar')
        });

    });


})