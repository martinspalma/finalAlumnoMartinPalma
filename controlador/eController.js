import Servicio from '../servicio/eServicio.js'


class Controlador{
#servicio
constructor(persistencia){
this.#servicio= new Servicio(persistencia)
}

obtenerEstadisticas= async (req,res) => {
const estadisticas = await this.#servicio.obtenerEstadisticas()
res.json(estadisticas)
}

obtenerLibros = async (req,res) => {
const { id } = req.params
try{const elemento = await this.#servicio.obtenerElementos(id)
res.json(elemento)
}catch(error){
    res.status(500).json({error: error.message, stack:error.stack})
}

}

guardarLibros = async (req,res) => {
    try{

const {codigo, titulo, autor } = req.body
const libro = { autor, titulo, codigo, estado: "disponible" };
console.log("econtroller", libro)
if(!Object.keys(libro).length){
            throw new Error('el elemento esta vacio')
        }
const libroGuardado = await this.#servicio.guardarLibro(libro)
res.json(libroGuardado)
}catch(error){
        res.status(500).json({error: error.message, stack:error.stack})
    }
}

cambiarEstadoLibro = async (req,res) => {
    try{
const codigo = Number(req.params.id)
console.log(codigo, typeof(codigo))
console.log(req.params)
const {estado} = req.body
const elemento={codigo, estado}
console.log(estado)
if(!Object.keys(elemento).length){
            throw new Error('el elemento esta vacio')
        }
const elementoModificado = await this.#servicio.actualizarElementos(elemento)
res.json(elementoModificado)
}catch(error){
        res.status(500).json({error: error.message, stack: error.stack})
    }
}

actualizarElementos = async (req,res) => {
    try{
const {id} = req.params
const elemento = req.body
if(!Object.keys(elemento).length){
            throw new Error('el elemento esta vacio')
        }
const elementoModificado = await this.#servicio.actualizarElementos(id, elemento)
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
