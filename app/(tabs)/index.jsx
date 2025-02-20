import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Dimensions, 
  TextInput, 
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';import React from 'react'
import { Redirect } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { signOut } from 'firebase/auth'; // ✅ Import signOut
import { removeLocalStorage } from '../../service/Storage';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import EmptyData from '../../components/EmptyData';



export default function HomeScreen() {

  return (
    <ImageBackground 
        // source={require('./../../assets/images/Backgrounds/Orange2.png')}
        style={styles.background}
    >
      <View>
        <Header/>
        <EmptyData/>
      </View>
    </ImageBackground>
  )
}

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    resizeMode: 'cover',
    backgroundColor: 'rgb(255, 255, 255)',
    flex: 1, 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.44)', 
    padding: 25,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})