import * as React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
} from "@react-navigation/native";

function TabNavigator({ initialRouteName, children, screenOptions }) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <ImageBackground
      source={require("../assets/WallpaperDark.webp")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.header}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            style={styles.headerImage}
            source={require("../assets/logo.png")}
          />
        </Pressable>
        <NavigationContent style={{ display: "flex", flex: 1 }}>
          <View style={styles.main}>
            {state.routes.map((route, i) => {
              return (
                <View
                  key={route.key}
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      display: state.index === i ? "flex" : "none",
                    },
                  ]}
                >
                  {descriptors[route.key].render()}
                </View>
              );
            })}
          </View>
        </NavigationContent>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 50,
  },
  headerImage: {
    height: 150,
    width: 350,
    resizeMode: "contain",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",

    marginTop: 20,
  },
});

export const createCustomLayout =
  createNavigatorFactory(TabNavigator);
