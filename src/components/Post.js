import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../Config/theme/colors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { listAllFlights } from "../../Api/Flights";
import { formatDate } from "./FormatTime";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";



// function for displaying a post
const PostItem = ({ post }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { id: post._id})}
      activeOpacity={0.8}
    >
      <View style={styles.post}>
        <View style={styles.header}>
          <Image
            source={{ uri: post.createdBy.profilePhoto }}
            style={styles.profileImage}
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.name, { color: activeColors.TextColor }]}>
                {post.createdBy.lastName}
              </Text>
              <MaterialIcons name="verified" size={18} color="#0A64EF" />
            </View>
            <Text style={styles.subtitle}>{formatDate(post.createdAt)}</Text>
          </View>

          <View style={styles.Kilos}>
            <Text style={[styles.oneKilos, { color: activeColors.TextColor }]}>
              $ {post.pricePerKg}/
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={24}
                color="#dc661f"
              />
            </Text>
            <Text
              style={[styles.KilosRemaining, { color: activeColors.TextColor }]}
            >
              {post.numberOfKilos} kg Remaining
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.FromAndTO}>
            <View style={styles.from}>
              <Text style={styles.FromAndTOText}>From:</Text>
              <View style={styles.fromDetails}>
                <View style={styles.cityFlag}>
                  <Text
                    style={[styles.city, { color: activeColors.TextColor }]}
                  >
                    {post.from.city}
                  </Text>
                  <Image
                    source={{ uri: post.from.flagPhoto }}
                    style={styles.flags}
                  />
                </View>
                <Text style={styles.country}>{post.from.country}</Text>
              </View>
            </View>
            <View style={styles.to}>
              <Text style={styles.FromAndTOText}>To:</Text>
              <View style={styles.toDetails}>
                <View style={styles.cityFlag}>
                  <Text
                    style={[styles.city, { color: activeColors.TextColor }]}
                  >
                    {post.to.city}
                  </Text>
                  <Image
                    source={{ uri: post.to.flagPhoto }}
                    style={styles.flags}
                  />
                </View>
                <Text style={styles.country}>{post.to.country}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dates}>
            <Text style={[styles.day, { color: activeColors.TextColor }]}>
              {post.depDate.day}
            </Text>
            <Text style={styles.month}>{post.depDate.month}</Text>
            <Text style={styles.year}>{post.depDate.year}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Post = () => {
 const {data, isLoading, error} = useQuery({
  queryKey: ['flights'],
  queryFn: listAllFlights,
 });

  // const [post, setPost] = useState([]); // Renamed 'Posts' to 'posts'

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await listAllFlights();
  //     setPost(res);
  //   };
  //   fetchPosts();
  // }, []);
  if (isLoading){
    return <ActivityIndicator/>
  }
 
  if(error){
    return <Text>{error.message}</Text>
  }
  

  const renderItem = ({ item }) => <PostItem post={item} />;

  return <FlatList data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  post: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "gray",
    padding: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
  },
  Kilos: {
    marginLeft: "auto",
  },
  oneKilos: {
    fontWeight: "bold",
  },
  KilosRemaining: {
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row",
  },
  FromAndTO: {
    marginVertical: 20,
  },
  FromAndTOText: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5,
    color: "gray",
  },
  from: {
    flexDirection: "row",
    paddingTop: 10,
  },
  to: {
    flexDirection: "row",
    paddingTop: 10,
  },
  cityFlag: {
    flexDirection: "row",
  },
  city: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  country: {
    color: "gray",
  },
  flags: {
    width: 40,
    height: 20,
  },
  dates: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontSize: 34,
    fontWeight: "bold",
  },
  month: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dc661f",
  },
  year: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
  },
});

export default Post;
