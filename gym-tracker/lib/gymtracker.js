import { useState, useEffect, useCallback } from 'react';

const useFetchData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const messageError = "No se pudo conectar con el servidor";

    const getExerciseData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('https://gym-tracker-4yxt.onrender.com/api/v1/exercises');
            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg || messageError);
            }
            const json = await response.json();
            setData((json?.docs ?? []).filter(Boolean));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const postExerciseData = useCallback(async (newExercise) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("https://gym-tracker-4yxt.onrender.com/api/v1/exercises", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExercise),
            });
            if (!response.ok) throw new Error(await response.text() || messageError);

            const json = await response.json();
            if (json?.doc) {
                setData((prev) => [...prev, json.doc]);
                await getExerciseData(); // 🔥 fuerza actualización
            }
            return json.doc;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [getExerciseData]);

    const deleteExerciseData = useCallback(async (id) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`https://gym-tracker-4yxt.onrender.com/api/v1/exercises/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg || messageError);
            }
            setData((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getExerciseData();
    }, [getExerciseData]);

    return { isLoading, data, error, postExerciseData, getExerciseData, deleteExerciseData };
};

export default useFetchData;
