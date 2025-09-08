import { View, Text, StyleSheet, ScrollView, TextInput, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useMemo } from "react";
import { useExercises } from "../../context/ExerciseContext";
import { LineChart } from "react-native-chart-kit";

export default function History() {
    const { data, isLoading, error, getExerciseData } = useExercises();
    const [filterType, setFilterType] = useState("");
    const [filterName, setFilterName] = useState("");
    const [metric, setMetric] = useState("weight"); // "weight" | "reps"

    useFocusEffect(
        useCallback(() => {
            getExerciseData();
        }, [getExerciseData])
    );

    // ✅ aplicar filtros
    const filteredData = useMemo(() => {
        return data
            ?.filter((item) => item && item.title)
            .filter((item) =>
                filterType ? item.type.toLowerCase() === filterType.toLowerCase() : true
            )
            .filter((item) =>
                filterName
                    ? item.title.toLowerCase().includes(filterName.toLowerCase())
                    : true
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // más antiguos primero
            .slice(-4); // ✅ últimos 4
    }, [data, filterType, filterName]);

    if (isLoading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    // 📊 datos para la gráfica
    const labels = filteredData.map((item) =>
        new Date(item.createdAt).toLocaleDateString()
    );
    const values = filteredData.map((item) =>
        metric === "weight" ? item.weight : item.reps
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Historial</Text>

            {/* Filtros */}
            <View style={styles.filters}>
                <Picker
                    selectedValue={filterType}
                    onValueChange={(val) => setFilterType(val)}
                    style={styles.picker}
                >
                    <Picker.Item label="Todos los tipos" value="" />
                    <Picker.Item label="Pecho" value="pecho" />
                    <Picker.Item label="Espalda" value="espalda" />
                    <Picker.Item label="Piernas" value="piernas" />
                    <Picker.Item label="Hombros" value="hombros" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Filtrar por nombre..."
                    value={filterName}
                    onChangeText={setFilterName}
                />
            </View>

            {/* Lista de últimos 4 ejercicios */}
            {filteredData.length === 0 ? (
                <Text>No hay ejercicios con esos filtros</Text>
            ) : (
                filteredData.map((item, index) => (
                    <View key={item._id} style={styles.card}>
                        <Text style={styles.bold}>
                            {index + 1}. {item.title}
                        </Text>
                        <Text>Grupo: {item.type}</Text>
                        <Text>Peso: {item.weight} kg</Text>
                        <Text>Reps: {item.reps}</Text>
                        <Text>
                            Fecha: {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                ))
            )}

            {/* 📊 Gráfica de progreso */}
            {filteredData.length > 0 && (
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.subtitle}>Comparativa de progreso</Text>

                    <Picker
                        selectedValue={metric}
                        onValueChange={(val) => setMetric(val)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Peso (kg)" value="weight" />
                        <Picker.Item label="Repeticiones" value="reps" />
                    </Picker>

                    <LineChart
                        data={{
                            labels,
                            datasets: [{ data: values }],
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#f9fafb",
                            backgroundGradientTo: "#f9fafb",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                        }}
                        bezier
                        style={styles.chart}
                    />
                </View>
            )}
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
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
    },
    filters: { marginBottom: 16 },
    picker: {
        backgroundColor: "#fff",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ddd",
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
    chart: { marginVertical: 8, borderRadius: 16 },
});
