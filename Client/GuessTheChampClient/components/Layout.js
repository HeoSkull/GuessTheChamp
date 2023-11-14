import * as React from "react";
import {
  View,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
  Dimensions,
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

const windowWidth = Dimensions.get("window").width;
const logoRatio = 350 / 150;
const logoWidth = windowWidth > 350 ? 350 : windowWidth - 20;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    overflow: "scroll",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 50,
  },
  headerImage: {
    height: logoWidth / logoRatio,
    width: logoWidth,
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
