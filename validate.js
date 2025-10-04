import Joi from "joi";
const contratoSchema = Joi.object({
  numero: Joi.number().required(),
  tipo: Joi.string().required(),
  empresa: Joi.object({
    nombre: Joi.string().required(),
    nit: Joi.string().required(),
    direccion: Joi.string().required(),
    telefono: Joi.string().required(),
    ciudad: Joi.string().required()
  }).required(),
  plazo: Joi.object({
    meses: Joi.number().required(),
    fecha_inicio: Joi.string().required(),
    fecha_vencimiento: Joi.string().allow(null)
  }).required(),
  prestamo: Joi.object({
    valor: Joi.number().required(),
    valor_letras: Joi.string().required()
  }).required(),
  articulo: Joi.object({
    descripcion: Joi.string().required(),
    peso: Joi.string().required()
  }).required(),
  vendedor: Joi.object({
    nombre: Joi.string().required(),
    cedula: Joi.string().required(),
    ciudad: Joi.string().required(),
    direccion: Joi.string().required(),
    celular: Joi.string().required()
  }).required(),
  comprador: Joi.object({
    nombre: Joi.string().required(),
    cedula: Joi.string().required()
  }).required(),
  firmas: Joi.object({
    vendedor: Joi.boolean().required(),
    comprador: Joi.boolean().required()
  }).required(),
  observaciones: Joi.string().required(),
  clausulas: Joi.object({
    primera: Joi.string().required(),
    segunda: Joi.string().required(),
    tercera: Joi.string().required()
  }).required()
});

export default contratoSchema;
