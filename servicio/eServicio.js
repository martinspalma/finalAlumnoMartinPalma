import ModelFactory from '../model/DAO/factory.js'
import { validar } from './validaciones/elementos.js'



class Servicio {
    #model
    constructor(persistencia) {
        this.#model = ModelFactory.get(persistencia)

    }

        

    esNuevo = async (id) => {

        const aviones = await this.#model.obtenerElementos()
        const idExiste = aviones.some(avion => avion.id === id)
        return !idExiste;
    }


    guardarCoordenadas = async (coordenadasAvion) => {

        const val = validar(coordenadasAvion)
        if (val.result) {
            let condicion = await this.esNuevo(coordenadasAvion.id)
            
            let elementoNuevo=null

            if (condicion){                

            elementoNuevo = await this.#model.guardarElemento(coordenadasAvion)
            }
            else{
                elementoNuevo = await this.#model.actualizarElementos(coordenadasAvion)
            }

            const limiteAlerta = 500
            
            const todosLosAviones = await this.#model.obtenerElementos()
            const otrosAviones = todosLosAviones.filter(avion => avion.id !== elementoNuevo.id)
            
            for (const otroAvion of otrosAviones) {
            const distancia = this.calcularDistanciaAviones(elementoNuevo, otroAvion);

            if (distancia < limiteAlerta) {
                const mensajeAlerta = `¡PELIGRO DE COLISIÓN! Avión ${elementoNuevo.id} y Avión ${otroAvion.id} están a ${distancia.toFixed(2)}m de distancia.`;
                console.error(mensajeAlerta);
                
            }
        }    
        

            return elementoNuevo
        }
        else {
            throw new Error(val.error.details[0].message)
        }
    }

    obtenerElementos = async () => {
        if (true) {
            const aviones = await this.#model.obtenerElementos()
            return aviones || {}
        }
        
    }

    calcularDistanciaAviones(avion1, avion2) {
    
    const dx2 = Math.pow(avion1.xa - avion2.xa, 2);
    const dy2 = Math.pow(avion1.ya - avion2.ya, 2);
    const dz2 = Math.pow(avion1.za - avion2.za, 2);

    const distancia = Math.sqrt(dx2 + dy2 + dz2);

    return distancia;
}

    



}

export default Servicio