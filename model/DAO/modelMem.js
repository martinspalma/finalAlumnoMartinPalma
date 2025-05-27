class ModelMem {
    #elementos

    constructor() {

        this.#elementos = [
            { id: '1', usuario: 'player1', email: 'player1@gmail.com', fechaNac: "17/10/2000",  contrasenia: "1234"},
            { id: '2', usuario: 'player100', email: 'player100@gmail.com', fechaNac: "11/10/2000",  contrasenia: "1234"},
            { id: '3', usuario: 'player2001', email: 'player2001@gmail.com', fechaNac: "1/10/2000",  contrasenia: "1234" },
        ]
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

    eliminarElemento = async (id) => {
        const index = this.#elementos.findIndex(e => e.id === id)
        if (index != -1) {
            const elementoEliminado = this.#elementos.splice(index, 1)[0]

            return elementoEliminado
        }
        else {
            let mensaje = "error al eliminar"
            return mensaje
        }
    }


}
export default ModelMem 