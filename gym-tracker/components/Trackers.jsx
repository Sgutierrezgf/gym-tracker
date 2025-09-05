import React, { useState } from 'react';
import {
    Text,
    TextInput,
    ScrollView,
    Pressable,
    StyleSheet,
    View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import gymtracer from '../lib/gymtracker';
import muscularGroups from '../app/interface/muscularGroup';

const Trackers = () => {
    const { postExerciseData, isLoading } = gymtracer();
    const [excercise, setExercise] = useState({
        type: '',
        title: '',
        weight: '',
        reps: ''
    });
    const [message, setMessage] = useState(null); // para mostrar alerta visual

    const handleChange = (name, value) => {
        setExercise({ ...excercise, [name]: value });
    };

    const handleSubmit = async () => {
        if (!excercise.type || !excercise.title || !excercise.weight || !excercise.reps) {
            setMessage({ type: 'error', text: '⚠️ Completa todos los campos' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }
        try {
            await postExerciseData(excercise);
            setExercise({ type: '', title: '', weight: '', reps: '' });
            setMessage({ type: 'success', text: '✅ Ejercicio guardado con éxito' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: '❌ No se pudo guardar el ejercicio' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Ejercicio</Text>

            {/* Mensaje dinámico */}
            {message && (
                <View
                    style={[
                        styles.alertBox,
                        message.type === 'error' ? styles.alertError : styles.alertSuccess
                    ]}
                >
                    <Text style={styles.alertText}>{message.text}</Text>
                </View>
            )}

            <Text style={styles.label}>Grupo muscular</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={excercise.type}
                    onValueChange={(value) => handleChange('type', value)}
                >
                    <Picker.Item label="Selecciona un grupo muscular" value="" />
                    {muscularGroups.map((group) => (
                        <Picker.Item key={group.id} label={group.name} value={group.name} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Nombre Ejercicio</Text>
            <TextInput
                style={styles.input}
                value={excercise.title}
                onChangeText={(text) => handleChange('title', text)}
                placeholder="Ej: Press banca"
            />

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
                style={styles.input}
                value={excercise.weight}
                onChangeText={(text) => handleChange('weight', text)}
                placeholder="Ej: 50"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Repeticiones</Text>
            <TextInput
                style={styles.input}
                value={excercise.reps}
                onChangeText={(text) => handleChange('reps', text)}
                placeholder="Ej: 12"
                keyboardType="numeric"
            />

            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    styles.button,
                    pressed && { opacity: 0.7 }
                ]}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Guardando...' : 'Guardar Ejercicio'}
                </Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9fafb'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1f2937'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#374151'
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 15
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    alertBox: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 16
    },
    alertText: {
        fontSize: 14,
        fontWeight: '500'
    },
    alertError: {
        backgroundColor: '#fee2e2',
        borderColor: '#fca5a5',
        borderWidth: 1,
        color: '#b91c1c'
    },
    alertSuccess: {
        backgroundColor: '#dcfce7',
        borderColor: '#86efac',
        borderWidth: 1,
        color: '#166534'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#fff'
    },
});

export default Trackers;
