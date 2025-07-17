import fs from 'fs'
import ArchivoPersistencia from './archivoPersistencia.js'

class ModelFile extends ArchivoPersistencia{
    
    constructor() {

        super('./data/aviones.json')
    }


    obtenerElemento = async (id) => {

        const elementos = await this.leer()
        const elementoBuscado = elementos.find(e => e.id == id)
        return (elementoBuscado.length > 0) ? elementoBuscado : { mensaje: `no existe con el id: ${id}`}
    }



    obtenerElementos = async () => {
        return await this.leer() || {}
    }

    guardarElemento = async (elemento) => {
        const elementos = await this.leer()
        elementos.push(elemento)
        await this.escribir(elementos)
        return elemento
    }

    actualizarElementos = async (elemento) => {
        const elementos = await this.leer()
        const index = elementos.findIndex(e => e.id === elemento.id)

        if (index != -1) {
            const elementoAnterior = elementos[index]
            const elementoActualizado = { ...elementoAnterior, ...elemento }
            elementos.splice(index, 1, elementoActualizado)
            await this.escribir(elementos)
            return elementoActualizado
        }
        else {
            let mensaje = "error en la actualizacion del avion"
            return mensaje
        }
    }



}
export default ModelFile 