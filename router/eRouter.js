import express from 'express'
import Controlador from '../controlador/eController.js'

class Router {
#cb=null
constructor (persistencia){
    this.#cb = new Controlador(persistencia)
}

start (){
    
    const router = express.Router()
//GET

router.get('/:id?', this.#cb.obtenerAviones)

//POST
router.post('/', this.#cb.guardarCoordenadas)


//------------------ SECTOR endpoint por default--------------------------
router.use(this.#cb.porError)

return router
}
}
export default Router
