import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import SaeListScreen from "./src/screens/SaeListScreen";
import SaeDetailScreen from "./src/screens/SaeDetailScreen";
import AddSaeScreen from "./src/screens/AddSaeScreen";
import GroupesScreen from "./src/screens/GroupesScreen";
import UesScreen from "./src/screens/UesScreen";
import EditSaeScreen from "./src/screens/EditSaeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "700",
          },
          contentStyle: {
            backgroundColor: "#f8fbff",
          },
        }}
      >
        <Stack.Screen
          name="Accueil"
          component={HomeScreen}
          options={{ title: "Accueil" }}
        />
        <Stack.Screen
          name="ListeSAE"
          component={SaeListScreen}
          options={{ title: "Liste des SAE" }}
        />
        <Stack.Screen
          name="DetailSAE"
          component={SaeDetailScreen}
          options={{ title: "Détail SAE" }}
        />
        <Stack.Screen
          name="AjoutSAE"
          component={AddSaeScreen}
          options={{ title: "Ajouter une SAE complète" }}
        />
        <Stack.Screen
          name="Groupes"
          component={GroupesScreen}
          options={{ title: "Groupes" }}
        />
        <Stack.Screen
          name="Ues"
          component={UesScreen}
          options={{ title: "UE" }}
        />
        <Stack.Screen
          name="EditSAE"
          component={EditSaeScreen}
          options={{ title: "Modifier une SAE" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}