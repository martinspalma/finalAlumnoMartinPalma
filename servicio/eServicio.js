import ModelFactory from '../model/DAO/factory.js'
import { validar, validarActualizacionEstado } from './validaciones/elementos.js'



class Servicio {
    #model
    constructor(persistencia) {
        this.#model = ModelFactory.get(persistencia)

    }

    obtenerEstadisticas = async () => {
        const elemento = await this.#model.obtenerElementos()
        const cantidadTotal = elemento.length


        const datosSondasIntermedios = elemento.reduce((acc, { id, temperatura }) => {
            if (!acc[id]) {
                acc[id] = { cantidad: 0, suma: 0 }
            }
            acc[id].cantidad += 1
            acc[id].suma += temperatura

            return acc
        }, {});

        const temperaturaSondas = Object.keys(datosSondasIntermedios).map(id => {
            const { cantidad, suma } = datosSondasIntermedios[id];

            const promedio = suma / cantidad;

            return {
                id: parseInt(id),
                promedio: parseFloat(promedio.toFixed(2))
            };
        });
        const promediosFormateados = temperaturaSondas
            .map(sonda => `- ID: ${sonda.id}, Promedio: ${sonda.promedio}°C`)
            .join('\n');

        return `Cantidad total de elementos: ${cantidadTotal}\n\nPromedios por sonda:\n${promediosFormateados}`;
    }



    obtenerElementos = async (id) => {
        if (id) {
            const elemento = await this.#model.obtenerElemento(id)
            return elemento || {}
        }
        else {
            return await this.#model.obtenerElementos()
        }
    }

    guardarLibro = async (elemento) => {


        const val = validar(elemento)
        if (val.result) {

            const elementoNuevo = await this.#model.guardarElemento(elemento)

            return elementoNuevo
        }
        else {
            throw new Error(val.error.details[0].message)
        }
    }

    verificarSorteo = async () => {
        const res = await fetch('https://libros.deno.dev/premios');
        if (!res.ok) {
            throw new Error(`Error externo: ${res.status}`);
        }
        const data = await res.json();
        // Esperamos { sorteo: number, premio: boolean }
        
        return data.premio;
    }


    actualizarElementos = async (elemento) => {

        const val = validarActualizacionEstado(elemento)
        if (val.result) {

            const libroSolicitado = await this.#model.obtenerElementoPorCodigo(elemento.codigo)
           
            if (libroSolicitado.estado === "disponible") {
                
                if (elemento.estado === "alquilado" && this.verificarSorteo()) {
                        this.#model.borrarElementos(elemento.codigo)
                        return "es tuyo papa";
                }

                const elementoActualizado = await this.#model.actualizarElementos(elemento)
                return elementoActualizado
            }
            else {
                throw new Error("el libro no esta disponible")
            }

        }

        else {
            throw new Error(val.error.details[0].message)
        }
    }


    borrarElementos = async (id) => {
        const eliminado = await this.#model.borrarElementos(id)

        return eliminado
    }



}

export default Servicio