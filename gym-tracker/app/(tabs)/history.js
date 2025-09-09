import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useMemo } from "react";
import { useExercises } from "../../context/ExerciseContext";
import { LineChart, BarChart } from "react-native-chart-kit";

export default function History() {
    const { data, isLoading, error, getExerciseData } = useExercises();
    const [filterType, setFilterType] = useState("");
    const [filterName, setFilterName] = useState("");
    const [metric, setMetric] = useState("weight");

    useFocusEffect(
        useCallback(() => {
            getExerciseData();
        }, [getExerciseData])
    );


    const exercisesByType = useMemo(() => {
        if (!filterType) return [];
        return [
            ...new Set(
                data
                    ?.filter((item) => item.type.toLowerCase() === filterType.toLowerCase())
                    .map((item) => item.title)
            ),
        ];
    }, [data, filterType]);


    const filteredData = useMemo(() => {
        if (!filterType || !filterName) return [];
        return data
            ?.filter(
                (item) =>
                    item.type.toLowerCase() === filterType.toLowerCase() &&
                    item.title.toLowerCase() === filterName.toLowerCase()
            )
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }, [data, filterType, filterName]);

    if (isLoading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error: {error}</Text>;


    const labels = filteredData.map((item) =>
        new Date(item.createdAt).toLocaleDateString()
    );
    const values = filteredData.map((item) =>
        metric === "weight" ? item.weight : item.reps
    );


    const groupedByDate = filteredData.reduce((acc, item) => {
        const date = new Date(item.createdAt).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});
    const volumeByDate = Object.keys(groupedByDate).map((date) =>
        groupedByDate[date].reduce((sum, ex) => sum + ex.weight * ex.reps, 0)
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Historial</Text>


            <Picker
                selectedValue={filterType}
                onValueChange={(val) => {
                    setFilterType(val);
                    setFilterName("");
                }}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona un grupo muscular" value="" />
                <Picker.Item label="Pecho" value="pecho" />
                <Picker.Item label="Espalda" value="espalda" />
                <Picker.Item label="Piernas" value="piernas" />
                <Picker.Item label="Hombros" value="hombros" />
            </Picker>


            {filterType !== "" && (
                <Picker
                    selectedValue={filterName}
                    onValueChange={(val) => setFilterName(val)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona un ejercicio" value="" />
                    {exercisesByType.map((name) => (
                        <Picker.Item key={name} label={name} value={name.toLowerCase()} />
                    ))}
                </Picker>
            )}


            {filterType && filterName && (
                <>
                    {filteredData.length === 0 ? (
                        <Text>No hay registros de este ejercicio</Text>
                    ) : (
                        <>

                            {filteredData.map((item, index) => (
                                <View key={item._id} style={styles.card}>
                                    <Text style={styles.bold}>
                                        {index + 1}. {item.title}
                                    </Text>
                                    <Text>Grupo: {item.type}</Text>
                                    <Text>Peso: {item.weight} kg</Text>
                                    <Text>Reps: {item.reps}</Text>
                                    <Text>
                                        Fecha:{" "}
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            ))}


                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.subtitle}>
                                    Comparativa de progreso
                                </Text>

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
                                        color: (opacity = 1) =>
                                            `rgba(0,0,0,${opacity})`,
                                        labelColor: (opacity = 1) =>
                                            `rgba(0,0,0,${opacity})`,
                                    }}
                                    bezier
                                    style={styles.chart}
                                />
                            </View>


                            {volumeByDate.length > 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.subtitle}>
                                        Volumen total (kg × reps)
                                    </Text>
                                    <BarChart
                                        data={{
                                            labels: Object.keys(groupedByDate),
                                            datasets: [{ data: volumeByDate }],
                                        }}
                                        width={Dimensions.get("window").width - 40}
                                        height={220}
                                        chartConfig={{
                                            backgroundGradientFrom: "#f9fafb",
                                            backgroundGradientTo: "#f9fafb",
                                            decimalPlaces: 0,
                                            color: (opacity = 1) =>
                                                `rgba(34,197,94,${opacity})`,
                                            labelColor: (opacity = 1) =>
                                                `rgba(0,0,0,${opacity})`,
                                        }}
                                        style={styles.chart}
                                    />
                                </View>
                            )}
                        </>
                    )}
                </>
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
    picker: {
        backgroundColor: "#fff",
        marginBottom: 12,
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
