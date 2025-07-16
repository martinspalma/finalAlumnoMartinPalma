import Joi from 'joi'

export const validar = (libro) => {

    const eEsquema = Joi.object({

        codigo: Joi.number().integer().required(),
        titulo:Joi.string().required(),
        autor: Joi.string().required(),
        estado: Joi.string().valid("disponible", "alquilado", "no-apto").required()
        //fecha: Joi.date().required(),
        
    })
    const { error } = eEsquema.validate(libro)
    if (error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


// el esquema no requiere actualizacion, lo dejo por las dudas
export const validarActualizacionEstado = (elemento) => {
    const eEsquema = Joi.object({
        codigo: Joi.number().integer().required(),
        estado: Joi.string().valid("disponible", "alquilado", "no-apto").required(),
         palabra: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .required()
        .messages({
      "string.pattern.base": "Debe ser una sola palabra sin símbolos ni espacios",
      "string.empty": "No puede estar vacío",}),
        //fecha: Joi.date().required(),
        
    })
    const { error } = eEsquema.validate(elemento, { convert: false })
    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }
};