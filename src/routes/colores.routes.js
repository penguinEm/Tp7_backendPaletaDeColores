import { Router } from "express";
import {
  borrarColorDb,
  colorBuscadoDb,
  crearColorDb,
  editarColorDb,
  listarColoresDb,
} from "../controllers/colores.controllers.js";
import { check } from "express-validator";

const router = Router();

router
  .route("/colores")
  .get(listarColoresDb)
  .post(
    [
      check("nombreColor")
        .notEmpty()
        .withMessage("Indicar el nombre del color es obligatorio")
        .isLength({
          min: 3,
          max: 15,
        })
        .withMessage("El campo del color debe contener entre 3 y 15 caracteres"),
    ],
    crearColorDb
  );
router
  .route("/colores/:id")
  .get(colorBuscadoDb)
  .put(
    [
      check("nombreColor")
        .notEmpty()
        .withMessage("Indicar el nombre del color es obligatorio")
        .isLength({
          min: 3,
          max: 15,
        })
        .withMessage("El campo del color debe contener entre 3 y 15 caracteres"),
    ],
    editarColorDb
  )
  .delete(borrarColorDb);

export default router;
