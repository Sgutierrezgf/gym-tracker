import { View, Text, StyleSheet } from "react-native";

export default function History() {
    return (
        <View >
            <Text style={styles.blueText}>Azul funciona</Text>
            <Text style={styles.redText}>Rojo también</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    blueText: {
        color: "blue",
    },
    redText: {
        color: "red",
    }
});
