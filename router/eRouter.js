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

router.get('/:id?', this.#cb.obtenerLibros)

//POST
router.post('/', this.#cb.guardarLibros)
//PUT
router.put('/:id', this.#cb.actualizarElementos)
//DELETE
router.delete('/:id', this.#cb.borrarElementos)
//PATCH
router.patch('/:id', this.#cb.cambiarEstadoLibro)
//------------------ SECTOR endpoint por default--------------------------
router.use(this.#cb.porError)

return router
}
}
export default Router
