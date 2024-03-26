import { Router } from "express";
import {
  borrarTareaDb,
  crearTareaDb,
  editarTareaDb,
  listarTareasDb,
  tareaBuscadaDb,
} from "../controllers/tareas.controllers.js";
import { check } from "express-validator";

const router = Router();

router
  .route("/tareas")
  .get(listarTareasDb)
  .post(
    [
      check("nombreTarea")
        .notEmpty()
        .withMessage("Indicar el nombre de la tarea es obligatorio")
        .isLength({
          min: 3,
          max: 30,
        })
        .withMessage("El campo de tarea debe contener entre 3 y 30 caracteres"),
    ],
    crearTareaDb
  );
router
  .route("/tareas/:id")
  .get(tareaBuscadaDb)
  .put([
    check("nombreTarea")
      .notEmpty()
      .withMessage("Indicar el nombre de la tarea es obligatorio")
      .isLength({
        min: 3,
        max: 30,
      })
      .withMessage("El campo de tarea debe contener entre 3 y 30 caracteres"),
  ],editarTareaDb
    )
  .delete(borrarTareaDb);

export default router;
