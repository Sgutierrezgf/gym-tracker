import React, { useState } from "react";
import {
    Text,
    TextInput,
    ScrollView,
    Pressable,
    StyleSheet,
    View,
    ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { muscularGroups, fields } from "../interface/muscularGroup";
import { useExercises } from "../context/ExerciseContext"; // 👈 usar contexto

const Trackers = () => {
    const { postExerciseData, isLoading } = useExercises(); // 👈 ahora viene del contexto
    const [exercise, setExercise] = useState({
        type: "",
        title: "",
        weight: "",
        reps: "",
    });
    const [message, setMessage] = useState(null);

    const handleChange = (name, value) => {
        setExercise({ ...exercise, [name]: value });
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSubmit = async () => {
        const isEmpty = Object.values(exercise).some((val) => !val.trim());
        if (isEmpty) return showMessage("error", "⚠️ Completa todos los campos");

        try {
            await postExerciseData(exercise);
            setExercise({ type: "", title: "", weight: "", reps: "" });
            showMessage("success", "✅ Ejercicio guardado con éxito");
        } catch (error) {
            showMessage("error", "❌ No se pudo guardar el ejercicio");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Ejercicio</Text>

            {message && (
                <View
                    style={[
                        styles.alertBox,
                        message.type === "error" ? styles.alertError : styles.alertSuccess,
                    ]}
                >
                    <Text style={styles.alertText}>{message.text}</Text>
                </View>
            )}

            <Text style={styles.label}>Grupo muscular</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={exercise.type}
                    onValueChange={(value) => handleChange("type", value)}
                >
                    <Picker.Item label="Selecciona un grupo muscular" value="" />
                    {muscularGroups.map((group) => (
                        <Picker.Item key={group.id} label={group.name} value={group.name} />
                    ))}
                </Picker>
            </View>

            {fields.map((f) => (
                <View key={f.id}>
                    <Text style={styles.label}>{f.label}</Text>
                    <TextInput
                        style={styles.input}
                        value={exercise[f.name]}
                        onChangeText={(text) => handleChange(f.name, text)}
                        placeholder={f.placeholder}
                        keyboardType={f.keyboardType || "default"}
                    />
                </View>
            ))}

            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.7 },
                ]}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Guardar Ejercicio</Text>
                )}
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#f9fafb" },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: "#1f2937",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: "#374151",
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        fontSize: 15,
    },
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    alertBox: { padding: 12, borderRadius: 8, marginBottom: 16 },
    alertText: { fontSize: 14, fontWeight: "500" },
    alertError: { backgroundColor: "#fee2e2", borderWidth: 1, borderColor: "#fca5a5" },
    alertSuccess: { backgroundColor: "#dcfce7", borderWidth: 1, borderColor: "#86efac" },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
});

export default Trackers;
