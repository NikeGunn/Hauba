import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import Loader from '../components/Loader';
import { logout, updateProfile } from '../redux/action';

const Profile = ({ navigation, route }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar.url);

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('avatar', {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split('/').pop(),
    });

    await dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  const handleImage = () => {
    navigation.navigate('camera', {
      updateProfile: true,
    });
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (route.params?.avatar) {
      setAvatar(route.params.avatar);
    }
  }, [route]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <Avatar.Image size={100} source={{ uri: avatar }} style={styles.avatar} />
      <TouchableOpacity onPress={handleImage}>
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

        <View style={styles.textContainer}>
                <Text style={styles.userName}>{user.name}</Text>
        </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Button
        style={styles.actionButton}
        onPress={submitHandler}
        mode="contained"
        color="#000"
      >
        Update
      </Button>

      <Button color="#666" onPress={() => navigation.navigate('changepassword')}>
        Change Password
      </Button>

      <Button color="#666" onPress={confirmLogout}>
        Logout
      </Button>

      {!user.verified && (
        <Button onPress={() => navigation.navigate('verify')} color="#900">
          Verify
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: '#900',
  },
  changePhoto: {
    color: '#900',
    margin: 20,
  },
  inputContainer: {
    width: '70%',
    marginVertical: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 15,
  },
  actionButton: {
    backgroundColor: '#900',
    padding: 5,
    width: '70%',
    marginVertical: 10,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  userName: {
    color: '#900',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;
