import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserListing,
  deleteUserListing,
  updateUserListing,
} from "../redux/action";
import colors from "../config/colors";

const UserListings = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const userListing = useSelector((state) => state.userListing);

  useEffect(() => {
    dispatch(getUserListing());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserListing()).then(() => {
      setRefreshing(false);
    });
  }, [dispatch]);

  const handleSaveEdit = async () => {
    try {
      if (selectedItemIndex !== null) {
        const formData = { title: editedTitle, price: editedPrice };
        const editedItem = userListing.userListings[selectedItemIndex];
        if (editedItem) {
          dispatch(updateUserListing(editedItem._id, formData));
        }
        setEditModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Error updating listing:", error);
    }
  };

  const handleDelete = (index) => {
    setSelectedItemIndex(index);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemIndex !== null) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this listing?",
        [
          {
            text: "Yes",
            onPress: () => {
              const itemToDelete = userListing.userListings[selectedItemIndex];
              if (itemToDelete) {
                dispatch(deleteUserListing(itemToDelete._id));
              }
              setDeleteModalVisible(false);
            },
          },
          {
            text: "No",
            onPress: () => {
              setDeleteModalVisible(false);
            },
          },
        ]
      );
    }
  };

  const renderContent = () => {
    if (!userListing.userListings) {
      return (
        <View style={styles.noListingsContainer}>
          <Text style={styles.noListingsText}>No item posted yet</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={userListing.userListings}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.listing}>
              <Image
                source={{ uri: item.images[0].url }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Rs.{item.price.toFixed(2)}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setSelectedItemIndex(index);
                    setEditedTitle(item.title);
                    setEditedPrice(item.price.toFixed(2));
                    setEditModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Listings</Text>
      {renderContent()}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modal}>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />
          <TextInput
            style={styles.input}
            value={editedPrice}
            onChangeText={(text) => setEditedPrice(text)}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modal}>
          <Text style={styles.deleteModalText}>
            Are you sure you want to delete this listing?
          </Text>
          <TouchableOpacity
            style={styles.confirmDeleteButton}
            onPress={handleConfirmDelete}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setDeleteModalVisible(false)}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    alignSelf: "center",
    color: colors.danger,
  },
  listing: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginBottom: 16,
    color: "green",
    paddingTop: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: colors.logoPurple,
    padding: 8,
    borderRadius: 5,
    width: "45%",
  },
  deleteButton: {
    backgroundColor: colors.danger,
    padding: 8,
    borderRadius: 5,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  input: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: colors.saveButton,
    padding: 8,
    borderRadius: 5,
    width: "80%",
    paddingVertical: 16,
  },
  cancelButton: {
    backgroundColor: colors.primary,
    padding: 8,
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
  },
  deleteModalText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 35,
    color: "#fff",
    width: "80%",
  },
  confirmDeleteButton: {
    backgroundColor: "blue",
    padding: 8,
    paddingVertical: 16,
    borderRadius: 5,
    width: "80%",
  },
  noListingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noListingsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
  },
});

export default UserListings;
