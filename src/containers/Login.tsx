import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import config from 'react-native-config';
import { logIn, showLoading, hideLoading } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const googleSignIn = async () => {
    dispatch(showLoading());

    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      console.info('idToken', idToken);

      dispatch(hideLoading());
      dispatch(logIn());
    } catch (error) {
      dispatch(hideLoading());
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        Alert.alert('Signin Error', error.message);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: config.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        {/* <Button title="Google Login" onPress={() => dispatch(logIn())} /> */}
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
