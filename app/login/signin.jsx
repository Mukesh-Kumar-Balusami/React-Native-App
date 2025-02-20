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
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { setLocalStorage } from '../../service/Storage';

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to handle login
    const handleLogin = () => {
        if (!email || !password) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        // If everything is fine, navigate to dashboard
        Alert.alert('Success', 'Welcome!');
        router.push('/dashboard');
    };

    const onSignInClick = ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log('Valid User: ',user);
                await setLocalStorage('userDetail',user);
                router.replace('(tabs)');
                ToastAndroid.show('Welcome', ToastAndroid.BOTTOM);
                Alert.alert('Welcome');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorMessage);
                console.log(errorCode);
                if (errorCode=='auth/invalid-credential') {
                    ToastAndroid.show('Invalid Credentials', ToastAndroid.BOTTOM);
                    Alert.alert('Invalid Credentials');
                }
            });
    }

    return (
        <ImageBackground 
            source={require('./../../assets/images/Backgrounds/Orange.png')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                {/* Login Slogan */}
                <View style={styles.pagetitle}>
                    <Text style={styles.pagetitletext}>MediKar</Text>
                    <Text style={styles.pagepara}>Get started by logging in...</Text>
                </View>

                {/* Login Box */}
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        placeholderTextColor="#fff" 
                        secureTextEntry 
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Error Message Display */}
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    {/* Login Button */}
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleLogin && onSignInClick}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* New User? Signup Option */}
                <TouchableOpacity 
                    style={styles.signupContainer} 
                    onPress={() => router.push('login/signup')}
                >
                    <Text style={styles.newUserText}>
                        New User? <Text style={styles.signupText}>Create account</Text>
                    </Text>
                </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff9800',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    signupContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    newUserText: {
        color: '#fff',
        fontSize: 16,
    },
    signupText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline',
    },
    pagetitletext: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 2,
    },
    pagepara: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 40,
    },
    pagetitle: {
        alignItems: 'center',
    }
});
