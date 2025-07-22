import React, { useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    // Request permission
    messaging().requestPermission();

    // Foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Notification Received', remoteMessage.notification.body);
    });

    // Get FCM token
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Push Notification App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;