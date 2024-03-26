import { validationResult } from "express-validator";
import Color from "../database/model/modelColor.js";

//! GET de todas las Colores
export const listarColoresDb = async (req, res) => {
  try {
    const listaColores = await Color.find();
    res.status(200).json(listaColores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al listar Colores" });
  }
};

//! POST crear Color
export const crearColorDb = async (req, res) => {
  try {
    //validacion xpress
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    //logica para crear
    const colorNuevo = new Color(req.body);
    await colorNuevo.save();
    res.status(201).json({
      mensaje: "El color fue creada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: "El color no pudo ser creada" });
  }
};

//! GET de 1 color buscada por id
export const colorBuscadoDb = async (req, res) => {
  try {
    const colorBuscado = await Color.findById(req.params.id);
    if (colorBuscado === null) {
      return res
        .status(404)
        .json({ mensaje: "No existe el color con el id enviado" });
    }
    res.status(200).json({ mensaje: colorBuscado });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "No se pudo encontrar solicitado, id incorrecto" });
  }
};

//! PUT edit de 1 color por id
export const editarColorDb = async (req, res) => {
  try {
    //validando con xpres
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    //logica para editar por id
    const colorBuscadoDb = await Color.findById(req.params.id);
    if (colorBuscadoDb === null) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el id del color que trata de editar" });
    }
    await Color.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Color editado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error inesperado no se pudo editar",
    });
  }
};

//! DELETE de 1 color por id
export const borrarColorDb = async (req, res) => {
  try {
    const colorBuscadoDb = await Color.findById(req.params.id);
    if (colorBuscadoDb === null) {
      return res
        .status(404)
        .json({ mensaje: "No existe el color que trata de borrar" });
    }
    await Color.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Color editado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error inesperado no se pudo editar",
    });
  }
};
