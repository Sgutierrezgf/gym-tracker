import { Router } from "express";
import { createExercise, deleteExercise, findAllExercises, findOneExercise } from "../controllers/exercises.controller";

const router = Router();

router.get('/', findAllExercises);

router.post('/', createExercise);

router.get('/:id', findOneExercise);

router.delete('/:id', deleteExercise);


export default router;