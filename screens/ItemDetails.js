import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserListing } from "../redux/action";

const ItemDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userListing = useSelector((state) => state.userListing.userListings);

  const [itemUser, setItemUser] = useState(null);

  useEffect(() => {
    async function fetchUserListing() {
      try {
        await dispatch(getUserListing());
        const foundUser = userListing.find(
          (user) => user._id === item.seller._id
        );
        console.log("foundUser:", foundUser);
        if (foundUser) {
          setItemUser(foundUser);
          console.log("foundUser:", foundUser);
        } else {
          console.log("User not found in userListing");
          setItemUser(null);
        }
      } catch (error) {
        console.error("Error fetching user listing:", error);
        setItemUser(null);
      }
    }

    if (userListing && userListing.length > 0) {
      fetchUserListing();
    }
  }, [dispatch, item.seller._id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.images[0]?.url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>Rs.{item.price?.toFixed(2)}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {itemUser ? (
        <View style={styles.userSection}>
          <Image
            source={{ uri: itemUser.avatar?.url }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{itemUser.name}</Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>User information not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    color: "green",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noUserText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});

export default ItemDetailsScreen;
