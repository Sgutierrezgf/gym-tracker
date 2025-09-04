import { Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Trackers = () => {

    const onPressFunction = () => {
        alert("Ejercicio guardado")
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Grupo muscular</Text>
            <TextInput style={styles.input} placeholder="Ej: Pecho, Espalda" />

            <Text style={styles.label}>Nombre Ejercicio</Text>
            <TextInput style={styles.input} placeholder="Ej: Press banca" />

            <Text style={styles.label}>Peso</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 50kg" />

            <Text style={styles.label}>Repeticiones</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="Ej: 12" />

            <Pressable onPress={onPressFunction} style={styles.button}>
                <Text style={styles.buttonText}>Guardar Ejercicio</Text>
            </Pressable >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f9fa"
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#4A90E2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default Trackers
