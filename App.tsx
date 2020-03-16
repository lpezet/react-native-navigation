import React from "react";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  NavigationContainerRef
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";

type RootStackParamList = {
  Home: {};
  Details: {};
};

/*
interface ScreenProps<RouteName extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
}
*/

const Stack = createStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function App() {
  const ref = React.useRef<NavigationContainerRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={ref}
        onStateChange={state => console.log("New state is", state)}
      >
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Button onPress={() => ref.current?.navigate("Home")} title="Go home" />
    </View>
  );
}

export default App;
