import { Text, StyleSheet, ScrollView } from 'react-native';

export default function About() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Acerca de Gym Tracker App</Text>
            <Text style={styles.paragraph}>
                Gym Tracker App es una app creada por Sebastián Gutiérrez. Esta aplicación tiene como objetivo principal ayudarte a llevar un registro de tus ejercicios en el gimnasio, permitiéndote registrar detalles como el tipo de ejercicio, el peso utilizado y las repeticiones realizadas.
            </Text>
            <Text style={styles.paragraph}>
                La aplicación está desarrollada utilizando React Native, lo que garantiza una experiencia fluida y receptiva en dispositivos móviles. Además, utiliza una API RESTful para gestionar y almacenar los datos de los ejercicios de manera eficiente.
            </Text>
            <Text style={styles.paragraph}>
                En parte, esta app sirve para mis propósitos de aprendizaje y práctica en el desarrollo de aplicaciones móviles y manejo de APIs. También servirá para llevar mis registros de ejercicios. Con el tiempo espero ir agregando nuevas funcionalidades y mejoras a la aplicación, para que pueda ser más completa y útil para usuarios interesados en el seguimiento de su actividad física.
            </Text>
            <Text style={styles.quote}>
                ¡Todo pasa, enfócate en tus objetivos tanto en tu cuerpo como en tu mente, no olvides de lo que eres capaz!
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9fafb',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: '#1f2937',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#374151',
        marginBottom: 16,
    },
    quote: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2563eb',
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
