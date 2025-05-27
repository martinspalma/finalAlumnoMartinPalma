import fs from 'fs'

class ModelFile {
    #archivoDeElementos

    constructor() {

        this.#archivoDeElementos = 'elementos.json'
    }

//-----------------------------------------------------------------------

    #leerArchivo = async ruta => {
        let archivo = []
        try {
            archivo = JSON.parse(await fs.promises.readFile(ruta, 'utf-8'))
        } catch { }
        return archivo
    }

    #escribirArchivo = async (ruta, texto) => {
        await fs.promises.writeFile(ruta, JSON.stringify(texto, null, '\t'))
    }


//-----------------------------------------------------------------------
    obtenerElemento = async (id) => {

        const elementos = await this.#leerArchivo(this.#archivoDeElementos)
        const elementoBuscado = elementos.find(e => e.id === id)
        return elementoBuscado || {}
    }

    obtenerElementos = async () => {
        return await this.#leerArchivo(this.#archivoDeElementos) || {}
    }

    guardarElementos = async (elemento) => {
        const elementos = await this.#leerArchivo(this.#archivoDeElementos)
        elemento.id = String(parseInt(elementos[elementos.length - 1]?.id || 0) + 1)
        elementos.push(elemento)
        await this.#escribirArchivo(this.#archivoDeElementos, elementos)
        return elemento
    }

    modificarElemento = async (id, elemento) => {
        const elementos = await this.#leerArchivo(this.#archivoDeElementos)
        const index = elementos.findIndex(e => e.id === id)

        if (index != -1) {
            const elementoAnterior = elementos[index]
            const elementoActualizado = { ...elementoAnterior, ...elemento }
            elementos.splice(index, 1, elementoActualizado)
            await this.#escribirArchivo(this.#archivoDeElementos, elementos)
            return elementoActualizado
        }
        else {
            let mensaje = "error en la actualizacion del archivo"
            return mensaje
        }
    }

    eliminarElementos = async (id) => {
        const elementos = await this.#leerArchivo(this.#archivoDeElementos)
        const index = elementos.findIndex(e => e.id === id)

        if (index != -1) {
            const elementoEliminado = elementos.splice(index, 1)[0]
            await this.#escribirArchivo(this.#archivoDeElementos, elementos)
            return elementoEliminado
        }
        else {
            let mensaje = "error al eliminar el archivo"
            return mensaje
        }
    }


}
export default ModelFile 