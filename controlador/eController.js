import Servicio from '../servicio/eServicio.js'


class Controlador{
#servicio
constructor(persistencia){
this.#servicio= new Servicio(persistencia)
}

obtenerElementos = async (req,res) => {
const { id } = req.params
const elemento = await this.#servicio.obtenerElementos(id)
res.json(elemento)
}

guardarElementos = async (req,res) => {
    try{
const elemento = req.body
if(!Object.keys(elemento).length){
            throw new Error('el elemento esta vacio')
        }
const elementoGuardado = await this.#servicio.guardarElemento(elemento)
res.json(elementoGuardado)
}catch(error){
        res.status(500).json({error: error.message})
    }
}

actualizarElementos = async (req,res) => {
    try{
const {id} = req.params
const elemento = req.body
if(!Object.keys(elemento).length){
            throw new Error('el elemento esta vacio')
        }
const elementoModificado = await this.#servicio.actualizarElemento(id, elemento)
res.json(elementoModificado)
}catch(error){
        res.status(500).json({error: error.message})
    }
}

borrarElementos = async (req,res) => {
const {id} = req.params
const eliminado = await this.#servicio.borrarElementos(id)
res.json(eliminado)
}

porError =(req, res)=>{
const {url:ruta, method: metodo}= req
res.status(404).send(`<h1 style= "color:purple;"> Error:  ${metodo} ${ruta} no encontrada</h1>`)
}
}

export default Controlador
