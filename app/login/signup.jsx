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
import { auth } from './../../config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';



export default function CreateAccount() {
    const router = useRouter();

    // State variables
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to handle account creation
    const handleCreateAccount = () => {
        if (!fullName || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // If everything is fine, navigate to dashboard
        Alert.alert('Success', 'Account created successfully!');
        router.push('login');
    };

    const onCreateAccount = ()=> {

        if (!fullName || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // If everything is fine, navigate to dashboard
        Alert.alert('Success', 'Account created successfully!');
        router.push('login/signin');


            createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                console.log(user);
                
                await updateProfile(user,{
                    displayName:fullName
                })
                await setLocalStorage('userDetail',user);

                router.push('(tabs)');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage);
                console.log(errorCode);
                if (errorCode=='auth/email-already-in-use') {
                    ToastAndroid.show('Email already exists', ToastAndroid.BOTTOM);
                    Alert.alert('Email already exists');
                }
            });
    }

    return (
        <ImageBackground 
            source={require('./../../assets/images/Backgrounds/Orange.png')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                {/* Slogan */}
                <View style={styles.pagetitle}>
                    <Text style={styles.pagetitletext}>MediKar</Text>
                    <Text style={styles.pagepara}>Create an account & Start from here</Text>
                </View>

                {/* Registration Box */}
                <View style={styles.registerContainer}>
                    <Text style={styles.title}>Register</Text>

                    {/* Full Name */}
                    <TextInput 
                        style={styles.input} 
                        placeholder="Full Name" 
                        placeholderTextColor="#fff" 
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    {/* Email */}
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor="#fff" 
                        value={email}
                        onChangeText={setEmail} 
                        keyboardType="email-address"
                    />

                    {/* Password */}
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        placeholderTextColor="#fff" 
                        secureTextEntry 
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Confirm Password */}
                    <TextInput 
                        style={styles.input} 
                        placeholder="Confirm Password" 
                        placeholderTextColor="#fff" 
                        secureTextEntry 
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    {/* Error Message Display */}
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    {/* Create Account Button */}
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onCreateAccount}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                        
                    </TouchableOpacity>
                </View>

                {/* Already have an account? Login Option */}
                <TouchableOpacity 
                    style={styles.loginContainer} 
                    onPress={() => router.push('login/signin')}
                >
                    <Text style={styles.newUserText}>
                        Have an account? <Text style={styles.loginText}>Login</Text>
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
    registerContainer: {
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
    loginContainer: {
        marginTop: 15,  // Add spacing below the register box
        alignItems: 'center',  // Center align horizontally
        // right: 40,
    },
    newUserText: {
        color: '#fff',
        fontSize: 16,
    },
    loginText: {
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
