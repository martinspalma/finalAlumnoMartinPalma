import ModelFactory from '../model/DAO/factory.js'
import { validar, validarActualizacion } from './validaciones/elementos.js'


class Servicio{
#model
constructor(persistencia){
    this.#model = ModelFactory.get(persistencia)
    
}
 
obtenerElementos = async (id) => {
    if(id) {
        const elemento = await this.#model.obtenerElemento(id)
        return elemento || {}
    }
    else {
        return await this.#model.obtenerElementos()
    }
}

guardarElemento = async (elemento) => {
   // jugador.fecha= new Date (elemento.fecha)
    
    const val= validar(elemento)
    if(val.result){
    const elementoNuevo= await this.#model.guardarElemento(elemento)
    return elementoNuevo
    }
    else{
        throw new Error(val.error.details[0].message)
    }
 }


actualizarElementos = async (id, elemento) => {
    const val= validarActualizacion(elemento)
    if(val.result){
    const elementoActualizado= await this.#model.actualizarElementos(id, elemento)
    return elementoActualizado
    }
    else{
        throw new Error(val.error.details[0].message)
    }
 }


borrarElementos = async (id) => {
        const eliminado = await this.#model.borrarElementos(id)
        
      return eliminado
    } 
   


}

export default Servicio