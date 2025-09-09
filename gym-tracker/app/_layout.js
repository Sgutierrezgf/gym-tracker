import { Stack } from 'expo-router';

import { ExerciseProvider } from "../context/ExerciseContext";


export default function Layout() {
    return (
        <ExerciseProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ExerciseProvider>
    );
}

