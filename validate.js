import Joi from "joi";

const contratoSchema = Joi.object({
  numero: Joi.string().required(),

  vendedor: Joi.object({
    nombre: Joi.string().required(),
    tipo_documento: Joi.string().required(),
    numero_documento: Joi.string().required(),
    lugar_expedicion: Joi.string().required(),
    direccion: Joi.string().required(),
    telefono: Joi.string().required()
  }).required(),

  comprador: Joi.object({
    nombre: Joi.string().required(),
    tipo_documento: Joi.string().required(),
    numero_documento: Joi.string().allow(""),
    mostrar_cc: Joi.boolean().required()
  }).required(),

  articulo: Joi.object({
    titulo_descripcion: Joi.string().required(),
    descripcion_detallada: Joi.string().allow(""),

    titulo_precio: Joi.string().required(),
    precio_compraventa: Joi.string().allow(""),

    precio_retroventa: Joi.string().allow("")
  }).required(),

  clausulas: Joi.object({
    titulo_clausulas: Joi.string().required(),

    primera: Joi.string().required(),
    segunda: Joi.string().required(),
    tercera: Joi.string().required(),
    cuarta: Joi.string().required(),
    quinta: Joi.string().required(),
    sexta: Joi.string().required(),
    septima: Joi.string().required(),
    octava: Joi.string().required()
  }).required(),

  firma: Joi.object({
    titulo_firmas: Joi.string().required(),

    vendedor_nombre: Joi.string().required(),
    vendedor_documento: Joi.string().required(),

    comprador_nombre: Joi.string().required(),
    comprador_documento: Joi.string().allow(""),

    bolsa_seguridad_no: Joi.string().allow("")
  }).required()
});

export default contratoSchema;
