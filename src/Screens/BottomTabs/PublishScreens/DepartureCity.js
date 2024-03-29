//replaced by Publish screen

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Config/theme/colors";
import { useContext } from "react";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { Country, City } from "country-state-city";



const DepartureCity = () => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // theme colors
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const handleArrowBackPress = () => {
    navigation.goBack();
  };
  const handleNextPress = () => {
    // console.log(inputText)
    navigation.navigate("Arrival city");
  };

  const handleTextChange = (text) => {
    setInputText(text);

    const filteredSuggestions = City.getAllCities()
      .filter((city) => city.name.toLowerCase().startsWith(text.toLowerCase()))
      .map((city, index) => ({
        key: `${index}`, // Using an incremental index as the key
        suggestion: `${city.name}, ${
          Country.getCountryByCode(city.countryCode).name
        }`,
      }));
    setSuggestions(filteredSuggestions);
  };

  const handlePress = (selectedCity) => {
    setInputText(selectedCity);
    setSuggestions([]);
    // navigation.navigate('Search',{input1: selectedCity})
  };

  const clearText = () => {
    setInputText("");
    setSuggestions([]);
    setIsFocus(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.bgcolor }]}>
      <View style={styles.content}>
        {/* header text */}
        <View style={styles.TextSection}>
          <Text style={[styles.TextHeader, { color: activeColors.TextColor }]}>
            where do you start from?&&&
          </Text>
        </View>

        {/* input button section */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: activeColors.TextColor }]}>
            Departure City
          </Text>
          <View
            style={[styles.inputButton, isFocus && { borderColor: "blue" }]}
          >
            <TextInput
              placeholder={!isFocus ? "ex.paris" : " "}
              value={inputText}
              onChangeText={handleTextChange}
              onFocus={() => setIsFocus(true)}
              style={{ color: activeColors.TextColor }}
              placeholderTextColor="gray"
            />
            {inputText !== "" && (
              <TouchableOpacity onPress={clearText} style={styles.cancelIcon}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>
          {suggestions.length > 0 && (
            <FlatList
              style={{ maxHeight: 380 }}
              data={suggestions}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.pressable}
                  onPress={() => handlePress(item.suggestion)}
                >
                  <Text style={styles.suggestionText}>{item.suggestion}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.key}
            />
          )}
        </View>
        {inputText !== "" && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextText}>Next</Text>
            <FontAwesome
              name="arrow-circle-right"
              size={50}
              color="#dc661f"
              style={{ paddingLeft: 6 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DepartureCity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 25,
    marginHorizontal: 20,
  },

  TextSection: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  TextHeader: {
    fontSize: 28,
    fontWeight: "700",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    bottom: -320,
    right: 10,
    position: "absolute",
  },
  nextText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  inputButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pressable: {
    backgroundColor: "#e5e5e5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
