import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import { addListing, getAllListing, loadUser } from "../redux/action";
import colors from "../config/colors";

const PostItems = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Furniture"); // Initialize category to "Furniture"
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Camera roll permission denied.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);

    // If an image was selected, add it to the form data
    if (selectedImage) {
      const localUri = selectedImage;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", { uri: localUri, name: filename, type });
    }

    setIsSubmitting(true);

    // Simulate a delay for posting the item

    setTimeout(() => {
      // Reset the form and stop the animation
      setIsSubmitting(false);
      setTitle("");
      setPrice("");
      setCategory("Furniture");
      setDescription("");
      setSelectedImage(null);
    }, 3000);

    // Dispatch the postItem action with the form data
    dispatch(addListing(formData));
    dispatch(loadUser());
  };

  // List of predefined categories
  const categories = [
    "Furniture",
    "Cameras",
    "Clothing",
    "Electronics",
    "Books",
    "Toys",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Post Item</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          label="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        {/* Category Picker */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.input}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleImageSelect}
          style={styles.selectImageButton}
        >
          Select Image
        </Button>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LottieView
              source={require("../assets/animations/done.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          ) : (
            <>
              <Icon name="check" size={20} color="white" />
              Post
            </>
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#900",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
  },
  selectImageButton: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.saveButton,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
});

export default PostItems;
