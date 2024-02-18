import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../../../srcAuth/context/LoginProvider";
import UserChat from "../../../components/UserChat";

const Chats = () => {
  const [AllBookings, setAllBookings] = useState([]);
  const { profile } = useLogin();
  const UserId = profile.userId;
  const navigation = useNavigation();

  useEffect(() => {
    const AllBookingsList = async () => {
      try {
        const response = await fetch(
          `http://10.32.116.58:8080/users/bookings/${UserId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAllBookings(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    AllBookingsList();
  }, []);
  console.log("bookings:", AllBookings);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {AllBookings.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default Chats;

const styles = StyleSheet.create({});
