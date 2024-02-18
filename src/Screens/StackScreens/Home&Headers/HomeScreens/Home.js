import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Post from "../../../../components/Post";
import Header1 from "../../../../components/Header1";
import SearchScreen from "../../../../searching/SearchScreen";
import { colors } from "../../../../../Config/theme/colors";
import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";

const Home = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo
            name="menu"
            size={44}
            color="white"
            style={{ marginLeft: 12 }}
          />
        </TouchableOpacity>
      ),
      title: "TravoMate",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#800020",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Help")}>
          <Entypo
            name="help-with-circle"
            size={30}
            color="white"
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  // theme colors
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  // nesting all the components in flatlist

  // const renderItem = ({ item }) => {
  //  if (item === 'SearchScreen') {
  //     return <SearchScreen />;
  //   } else if (item === 'Post') {
  //     return <Post />;
  //   }
  //   return null;
  // };

  // const data = ['SearchScreen','Post'];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.bgcolor }]}
    >
      <Header1 />
      {/* <SearchScreen /> */}
      <Post />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
