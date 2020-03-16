import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator
} from "@react-navigation/stack";
import {
  Button,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View
} from "react-native";

type RootStackParamList = {
  Home: {};
  Profile: {
    name: string;
  };
  CustomHeader: {};
  CustomHeader2: {};
  LogoTitle: {};
  CustomBackButton: {};
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

function CustomBackButtonScreen({
  navigation
}: ScreenProps<"CustomBackButton">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Custom Header (with a logo)</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function CustomHeader2Screen({ navigation }: ScreenProps<"CustomHeader2">) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      )
    });
  }, [navigation, setCount]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Count:
        {count}
      </Text>
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
      <Button
        title="Go to CustomerHeader 2 Screen"
        onPress={() => {
          navigation.navigate("CustomHeader2");
        }}
      />
      <Button
        title="Go to Custom Back Button Screen"
        onPress={() => {
          navigation.navigate("CustomBackButton");
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  myCustomHeaderBackImage: {
    height: 14.5,
    width: 24,
    marginLeft: 9,
    marginRight: 12,
    marginVertical: 12,
    resizeMode: "contain"
  }
  /*
  myCustomHeaderBackImageAlt: {
    tintColor: "#f00"
  }
  */
});

function MyCustomHeaderBackImage(style: ImageStyle) {
  return (
    <Image
      source={require("./assets/back.png")}
      // , this.props.style
      style={[styles.myCustomHeaderBackImage, style]}
    />
  );
}

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
          options={{
            headerTitle: () => <LogoTitleHeader />,
            headerRight: () => (
              <Button
                onPress={() => {
                  console.log("This is a button!");
                }}
                title="Info"
              />
            )
          }}
        />
        <Stack.Screen
          name="CustomHeader2"
          component={CustomHeader2Screen}
          // not sure what type "props" would be here:
          // headerTitle: props => <LogoTitleHeader {...props} />
          options={{
            headerTitle: () => <LogoTitleHeader />
          }}
        />
        <Stack.Screen
          name="CustomBackButton"
          component={CustomBackButtonScreen}
          // not sure what type "props" would be here:
          // headerTitle: props => <LogoTitleHeader {...props} />
          options={{
            // style={styles.myCustomHeaderBackImageAlt}
            headerBackImage: () => <MyCustomHeaderBackImage />
          }}
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
