import { View, Text, StyleSheet } from "react-native";
import gymtracker from '../../lib/gymtracker';

export default function History() {
    const { data, error, isLoading } = gymtracker();

    if (isLoading) {
        return <Text>Cargando...</Text>;
    }
    if (error) {
        return <Text>Error al cargar los datos</Text>;
    }

    return (
        <View>
            {data && data.map((item) => (
                <View key={item._id}>
                    <Text>{item.type}</Text>
                    <Text>{item.title}</Text>
                    <Text>{item.weight}</Text>
                    <Text>{item.reps}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    blueText: {
        color: "blue",
    },
    redText: {
        color: "red",
    }
});
