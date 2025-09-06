import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import { Text, View } from 'react-native'


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="tracker"
                options={{
                    title: "Tracker",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 size={28} name="weight" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 size={28} name="history" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 size={28} name="info" color={color} />
                    ),
                }}
            />
        </Tabs>
    )

}