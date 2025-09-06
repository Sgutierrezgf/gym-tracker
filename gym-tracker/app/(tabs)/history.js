import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useExercises } from "../../context/ExerciseContext";

export default function History() {
    const { data, isLoading, error, getExerciseData } = useExercises(); // ✅ traerlo del context

    useFocusEffect(
        useCallback(() => {
            getExerciseData();
        }, [getExerciseData])
    );

    if (isLoading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error: {error}</Text>;


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Historial</Text>
            {data.length === 0 && <Text>No hay ejercicios aún</Text>}
            {data
                ?.filter((item) => item && item.title)
                .map((item) => (
                    <View key={item._id} style={styles.card}>
                        <Text style={styles.bold}>{item.title}</Text>
                        <Text>Grupo: {item.type}</Text>
                        <Text>Peso: {item.weight} kg</Text>
                        <Text>Reps: {item.reps}</Text>
                        <Text>
                            Fecha: {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#f9fafb" },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
    },
    bold: { fontWeight: "700" },
});
