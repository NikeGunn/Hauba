// AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ItemDetails from "./ItemDetails";
import PostItems from "./PostItems";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Stack.Screen
      name="ItemDetails"
      component={ItemDetails}
      options={({ route }) => ({
        title: route.params.item.title,
      })}
    />
    <Stack.Screen name="PostItems" component={PostItems} />
  </Stack.Navigator>
);

export default AppNavigator;
