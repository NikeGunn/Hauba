import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../components/LoadingScreen';

import colors from '../config/colors';


const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://192.168.1.76:4000/api/v1/getlistings'
      );
      if (response.data.success) {
        setItems(response.data.items);
        setNetworkError(false);
      } else {
        setNetworkError(true);
      }
    } catch (error) {
      if (error && error.message === 'Network Error') {
        setNetworkError(true);
      } else {
        setNetworkError(false);
        Alert.alert(
          'Error',
          'Failed to fetch data. Please try again later.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <LoadingScreen />
        </View>
      );
    } else if (networkError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={ styles.networkError }>Network error. Please try again.</Text>
          <TouchableOpacity onPress={fetchData}>
            {refreshing ? (
              <LoadingScreen />
            ) : (
              <Text style={styles.retryText}>Tap to Retry</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    } else if (!items || items.length === 0) {
      return (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      );
    } else {
      return (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetails(item)}>
              <View style={styles.card}>
                <Image source={{ uri: item.images[0].url }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Rs.{item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      );
    }
  };

  const navigateToDetails = (item) => {
    navigation.navigate('AppNavigator', {
      screen: 'ItemDetails',
      params: { item },
      headerShown: false,
    });
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    overflow: 'hidden',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  retryText: {
    fontSize: 20,
    color: colors.danger,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  networkError:{
    fontSize: 18,
    color: colors.dark,
    marginTop: 8,
  },
  retryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;






