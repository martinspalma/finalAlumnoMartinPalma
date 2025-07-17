import express from 'express'
import Router from './router/eRouter.js' 


class Server{
    #port
    #persistencia
    constructor (port, persistencia){
        this.#port=port
        this.#persistencia=persistencia
    }
start(){
const app= express()

//-------------------MIDDLEWARES EXPRESS---------------------
//app.use('/', express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//--------------------API RESTFUL ----------------------------
app.use('/aeropuerto', new Router(this.#persistencia).start())

//------------------ SECTOR LISTEN----------------------------
const port = this.#port 
const server= app.listen(port, () => { 
console.log(`Servidor escuchando en http://localhost:${port}`)})
server.on('error', (error)=>{
 console.log(`error en servidor: ${error.message}`)
})
}
}
export default Server
