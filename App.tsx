import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Text, View } from "react-native";

type RootStackParamList = {
  Home: {};
  Profile: {};
  Settings: {};
  Root: {};
};

interface ScreenProps<RouteName extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
}

function ProfileScreen({ navigation }: ScreenProps<"Profile">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }: ScreenProps<"Settings">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

function HomeScreen({ navigation }: ScreenProps<"Home">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Root", {
            screen: "Profile"
          });
        }}
      />
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate("Root", {
            screen: "Settings"
          });
        }}
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Root" component={Root} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
