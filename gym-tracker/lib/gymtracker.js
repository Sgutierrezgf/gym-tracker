import { useState, useEffect } from 'react';

const useFetchData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]); // mejor iniciar como array vacío
    const [error, setError] = useState(null);

    const messageError = "No se pudo conectar con el servidor";

    const getExerciseData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://gym-tracker-4yxt.onrender.com/api/v1/exercises');
            if (!response.ok) throw new Error(messageError);

            const json = await response.json();
            setData(json.docs || []);
        } catch (err) {
            setError(messageError);
        } finally {
            setIsLoading(false);
        }
    };

    const postExerciseData = async (newExercise) => {
        try {
            setIsLoading(true);
            const response = await fetch('https://gym-tracker-4yxt.onrender.com/api/v1/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExercise)
            });
            if (!response.ok) throw new Error(messageError);

            const json = await response.json();
            setData((prev) => [...prev, json.doc]); // prev evita problemas con estado anterior
        } catch (err) {
            setError(messageError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getExerciseData();
    }, []);

    return { isLoading, data, error, postExerciseData, getExerciseData };
};

export default useFetchData;
