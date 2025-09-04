import Exercise from "../models/Exercise";
import { getPagination } from "../libs/getPagination";

export const findAllExercises = async (req, res) => {
    try {
        const { size, page } = req.query
        const { limit, offset } = getPagination(size, page);
        const exercises = await Exercise.paginate({}, { offset, limit });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving exercises' });
    }
}

export const createExercise = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const newExercise = new Exercise({ type: req.body.type, title: req.body.title, reps: req.body.reps, weight: req.body.weight });
        const exercisesSaved = await newExercise.save();
        res.json(exercisesSaved);
    } catch (error) {
        res.status(500).json({ message: 'Error creating exercise' });
    }
}

export const findOneExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findById(id);
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving exercise' });
    }
}

export const deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const exerciseDeleted = await Exercise.findByIdAndDelete(id);
        res.json(exerciseDeleted);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exercise' });
    }
}