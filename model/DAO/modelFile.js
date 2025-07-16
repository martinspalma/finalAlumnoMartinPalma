import fs from 'fs'
import ArchivoPersistencia from './archivoPersistencia.js'

class ModelFile extends ArchivoPersistencia{
    
    constructor() {

        super('./data/libros.json')
    }


    obtenerElemento = async (id) => {

        const elementos = await this.leer()
        const elementoBuscado = elementos.find(e => e.id == id)
        return (elementoBuscado.length > 0) ? elementoBuscado : { mensaje: `no existe con el id: ${id}`}
    }

    obtenerElementoPorCodigo = async (id) => {

        const elementos = await this.leer()
        const elementoBuscado = elementos.find(e => e.codigo == id)
        return elementoBuscado
    }

    obtenerElementos = async () => {
        return await this.leer() || {}
    }

    guardarElemento = async (elemento) => {
        const elementos = await this.leer()
        elemento.id = String(parseInt(elementos[elementos.length - 1]?.id || 0) + 1)
        elemento.timestamp = Date.now()
        elementos.push(elemento)
        await this.escribir(elementos)
        return elemento
    }

    actualizarElementos = async (elemento) => {
        const elementos = await this.leer()
        const index = elementos.findIndex(e => e.codigo === elemento.codigo)

        if (index != -1) {
            const elementoAnterior = elementos[index]
            const elementoActualizado = { ...elementoAnterior, ...elemento }
            elementos.splice(index, 1, elementoActualizado)
            await this.escribir(elementos)
            return elementoActualizado
        }
        else {
            let mensaje = "error en la actualizacion del archivo"
            return mensaje
        }
    }

    borrarElementos = async (id) => {
        const elementos = await this.leer()
        const index = elementos.findIndex(e => e.codigo === id)

        if (index != -1) {
            const elementoEliminado = elementos.splice(index, 1)[0]
            await this.escribir(elementos)
            return elementoEliminado
        }
        else {
            let mensaje = "error al eliminar el archivo"
            return mensaje
        }
    }


}
export default ModelFile 