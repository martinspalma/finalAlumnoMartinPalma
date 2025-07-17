import Joi from 'joi'

export const validar = (libro) => {

    const eEsquema = Joi.object({

        id: Joi.string()
        .length(6)            
        .pattern(/^[A-Za-z]{3}[0-9]{3}$/) 
        .required()           
        .messages({
            'string.base': 'El ID debe ser una cadena de texto.',
            'string.length': 'El ID debe tener exactamente 6 caracteres.',
            'string.pattern.base': 'El ID debe contener 3 letras seguidas de 3 números (ej. ABC123).',
            'any.required': 'El ID es un campo requerido.'
        }),

        xa: Joi.number()
        .integer()            
        .min(1000)            
        .max(9999)            
        .required()           
        .messages({
            'number.base': 'La coordenada X debe ser un número.',
            'number.integer': 'La coordenada X debe ser un número entero.',
            'number.min': 'La coordenada X debe tener al menos 4 dígitos (valor mínimo 1000).',
            'number.max': 'La coordenada X no debe exceder los 4 dígitos (valor máximo 9999).',
            'any.required': 'La coordenada X es un campo requerido.'
        }),

        ya: Joi.number()
        .integer()            
        .min(1000)            
        .max(9999)            
        .required()           
        .messages({
            'number.base': 'La coordenada y debe ser un número.',
            'number.integer': 'La coordenada y debe ser un número entero.',
            'number.min': 'La coordenada y debe tener al menos 4 dígitos (valor mínimo 1000).',
            'number.max': 'La coordenada y no debe exceder los 4 dígitos (valor máximo 9999).',
            'any.required': 'La coordenada y es un campo requerido.'
        }),
        
        za: Joi.number()
        .integer()            
        .min(1000)            
        .max(9999)            
        .required()           
        .messages({
            'number.base': 'La coordenada z debe ser un número.',
            'number.integer': 'La coordenada z debe ser un número entero.',
            'number.min': 'La coordenada z debe tener al menos 4 dígitos (valor mínimo 1000).',
            'number.max': 'La coordenada z no debe exceder los 4 dígitos (valor máximo 9999).',
            'any.required': 'La coordenada z es un campo requerido.'
        }),
    })
    const { error } = eEsquema.validate(libro)
    if (error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}


