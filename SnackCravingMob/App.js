import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import {
  Cart,
  Burger,
  Fries,
  Pasta,
  IceCream,
  Tea,
  Drinks,
  ProductDetails,
} from "./src/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Burger"
          component={Burger}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Fries"
          component={Fries}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Pasta"
          component={Pasta}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Ice Cream"
          component={IceCream}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tea"
          component={Tea}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Drinks"
          component={Drinks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
