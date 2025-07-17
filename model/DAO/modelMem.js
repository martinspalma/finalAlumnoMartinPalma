class ModelMem {
    #elementos

    constructor() {

        this.#elementos = [ ]
    }

    obtenerElemento = async (id) => {

        const elementoBuscado = this.#elementos.find(l => l.id === id)
        return elementoBuscado || {}
    }

    obtenerElementos = async () => {
        return this.#elementos
    }

    guardarElemento = async (elemento) => {
        elemento.id = String(parseInt(this.#elementos[this.#elementos.length - 1]?.id || 0) + 1)
        this.#elementos.push(elemento)

        return elemento
    }

    modificarElemento = async (id, elemento) => {
        const index = this.#elementos.findIndex(e => e.id === id)

        if (index != -1) {
            const elementoAnterior = this.#elementos[index]
            const elementoActualizado = { ...elementoAnterior, ...elemento }
            this.#elementos.splice(index, 1, elementoActualizado)
            return elementoActualizado
        }
        else {
            let mensaje = "error en la actualizacion"
            return mensaje
        }
    }

   

}
export default ModelMem 