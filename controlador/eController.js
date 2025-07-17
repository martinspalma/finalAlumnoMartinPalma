import Servicio from '../servicio/eServicio.js'


class Controlador{
#servicio
constructor(persistencia){
this.#servicio= new Servicio(persistencia)
}

obtenerAviones = async (req,res) => {

try{
    const elemento = await this.#servicio.obtenerElementos()
res.json(elemento)
}catch(error){
    res.status(500).json({error: error.message, stack:error.stack})
}

}

guardarCoordenadas = async (req,res) => {
    try{

const  {id, xa, ya, za}= req.body

const avion = { id, xa, ya, za };
console.log("econtroller", avion)
if(!Object.keys(avion).length){
            throw new Error('el elemento esta vacio')
        }
const coordenadasAvion = await this.#servicio.guardarCoordenadas(avion)
res.json(coordenadasAvion)
}catch(error){
        res.status(500).json({errorMsg: error.message})
    }
}

porError =(req, res)=>{
const {url:ruta, method: metodo}= req
res.status(404).send(`<h1 style= "color:purple;"> Error:  ${metodo} ${ruta} no encontrada</h1>`)
}
}

export default Controlador
