import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator
} from "@react-navigation/stack";
import { Button, Text, TextInput, View } from "react-native";

type RootStackParamList = {
  Home: {
    post?: string;
  };
  Details: {
    itemId: number;
    otherParam?: string;
  };
  CreatePost: {};
};

interface ScreenProps<RouteName extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
}

function CreatePostScreen({ navigation }: ScreenProps<"CreatePost">) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

function HomeScreen({ navigation, route }: ScreenProps<"Home">) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>
        Post:
        {route.params?.post}
      </Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here"
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({
  route: { params },
  navigation
}: ScreenProps<"Details">) {
  const { itemId } = params;
  const { otherParam } = params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>
        itemId:
        {JSON.stringify(itemId)}
      </Text>
      <Text>
        otherParam:
        {JSON.stringify(otherParam)}
      </Text>
      <Button
        title="Go to Details... again"
        onPress={() => {
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100)
          });
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
