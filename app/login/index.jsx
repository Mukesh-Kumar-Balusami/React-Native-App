import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ImageBackground 
      source={require('./../../assets/images/Backgrounds/Orange.png')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Right-aligned welcome text */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome :)</Text>
          <Text style={styles.subText}>Get started by clicking the continue button</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, isPressed && styles.buttonPressed]} 
          onPress={() => router.push('login/signin')}
          onPressIn={() => setIsPressed(true)}  // Turns orange when pressed
          onPressOut={() => setIsPressed(false)} // Reverts back to white when released
        >
          <Text style={[styles.buttonText, isPressed && styles.buttonTextPressed]}>Continue</Text>
        </TouchableOpacity>

        {/* Terms & Conditions Note */}
        <Text style={styles.note}>
          Note: By clicking the continue button you accept our terms and conditions
        </Text>
      </View>
    </ImageBackground>
  );
}

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    resizeMode: 'cover',
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'flex-end', // Align content to the right
    paddingHorizontal: 40, // Add some spacing from the right edge
  },
  textContainer: {
    alignItems: 'flex-end', // Align text to the right
    marginBottom: 50, // Space before the button
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'right', // Ensures text aligns right
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%', // Adjust width as needed
  },
  buttonPressed: {
    backgroundColor: '#d35400', // Turns orange when pressed
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonTextPressed: {
    color: 'white', // Text turns white when button is pressed
  },
  note: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
    marginTop: 20,
  },
});
