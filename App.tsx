import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator
} from "@react-navigation/stack";
import { Button, Image, Text, View } from "react-native";

type RootStackParamList = {
  Home: {};
  Profile: {
    name: string;
  };
  CustomHeader: {};
  LogoTitle: {};
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

function CustomHeaderScreen({ navigation }: ScreenProps<"CustomHeader">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Custom Header (with a logo)</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function HomeScreen({ navigation }: ScreenProps<"Home">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { name: "Custom profile header" });
        }}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
      <Button
        title="Go to CustomerHeader Screen"
        onPress={() => {
          navigation.navigate("CustomHeader");
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function LogoTitleHeader() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri:
          "https://github.com/facebook/react-native-website/blob/master/website/static/img/tiny_logo.png?raw=true"
      }}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My home"
          }}
        />
        <Stack.Screen
          name="CustomHeader"
          component={CustomHeaderScreen}
          // not sure what type "props" would be here:
          // headerTitle: props => <LogoTitleHeader {...props} />
          options={{ headerTitle: () => <LogoTitleHeader /> }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
