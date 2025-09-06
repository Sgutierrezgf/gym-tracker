import { createContext, useContext } from "react";
import useFetchData from "../lib/gymtracker";


const ExerciseContext = createContext();


export const ExerciseProvider = ({ children }) => {
    const exercises = useFetchData();

    return (
        <ExerciseContext.Provider value={exercises}>
            {children}
        </ExerciseContext.Provider>
    );
};


export const useExercises = () => useContext(ExerciseContext);
