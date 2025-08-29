import { useState, useEffect } from 'react';

const FecthData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const messageError = "No se pudo conectar con el servidor";

    const getExerciseData = async () => {
        try {
            const response = await fetch('https://gym-tracker-4yxt.onrender.com/api/v1/exercises');
            const json = await response.json();
            setData(json.docs);
            setIsLoading(false);
        }
        catch (err) {
            setError(messageError);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getExerciseData();
    }, []);

    return { isLoading, data, error };
}

export default FecthData;