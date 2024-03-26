import { validationResult } from "express-validator";
import Color from "../database/model/modelColor.js";

//! GET de todas las Colores
export const listarColoresDb = async (req, res) => {
  try {
    const listaColores = await Tarea.find();
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
    const colorNuevo = new Tarea(req.body);
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
export const tareaBuscadaDb = async (req, res) => {
  try {
    const tareaBuscada = await Tarea.findById(req.params.id);
    if (tareaBuscada === null) {
      return res
        .status(404)
        .json({ mensaje: "No existe el producto con el id enviado" });
    }
    res.status(200).json({ mensaje: tareaBuscada });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "No se pudo encontrar solicitado, id incorrecto" });
  }
};

//! PUT edit de 1 tarea por id
export const editarTareaDb = async (req, res) => {
  try {
    //validando con xpres
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    //logica para editar por id
    const tareaBuscadaDb = await Tarea.findById(req.params.id);
    if (tareaBuscadaDb === null) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro la tarea que trata de editar" });
    }
    await Tarea.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Tarea editada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error inesperado no se pudo editar la tarea",
    });
  }
};

//! DELETE de 1 tarea por id
export const borrarTareaDb = async (req, res) => {
  try {
    const tareaBuscadaDb = await Tarea.findById(req.params.id);
    if (tareaBuscadaDb === null) {
      return res
        .status(404)
        .json({ mensaje: "No existe la tarea que trata de borrar" });
    }
    await Tarea.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Tarea editada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error inesperado no se pudo editar la tarea",
    });
  }
};
