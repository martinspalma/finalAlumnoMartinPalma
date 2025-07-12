import fs from 'fs'
import ArchivoPersistencia from './archivoPersistencia'

class ModelFile extends ArchivoPersistencia{
    
    constructor() {

        super('./data/usuarios.json')
    }


    obtenerElemento = async (id) => {

        const elementos = await this.leer()
        const elementoBuscado = elementos.find(e => e.id === id)
        return elementoBuscado || {}
    }

    obtenerElementos = async () => {
        return await this.leer() || {}
    }

    guardarElementos = async (elemento) => {
        const elementos = await this.leer()
        elemento.id = String(parseInt(elementos[elementos.length - 1]?.id || 0) + 1)
        elementos.push(elemento)
        await this.escribir(elementos)
        return elemento
    }

    modificarElemento = async (id, elemento) => {
        const elementos = await this.leer()
        const index = elementos.findIndex(e => e.id === id)

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

    eliminarElementos = async (id) => {
        const elementos = await this.leer()
        const index = elementos.findIndex(e => e.id === id)

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