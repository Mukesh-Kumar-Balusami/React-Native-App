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
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AddMedicineHeader() {

    const router = useRouter();

  return (
    <View style ={styles.container}>
        <View style = {styles.row}>
            <Text style = {styles.title}>💊 Add Medicines</Text>
            <TouchableOpacity style = {styles.backIcon}
                onPress={() => router.back()}
                >
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}


// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: width, // ✅ Better for responsiveness
        // paddingHorizontal: 10, // ✅ Adds spacing from edges
        // paddingVertical: 15, // ✅ Better spacing
        padding: 5,

        //  ✅ Proper shadow properties
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 15, // ✅ Required for Android

        // ✅ Add shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,

        //  // ✅ Add elevation for Android
        //  elevation: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    backIcon: {
        // position: 'absolute',
        padding: 10,
        backgroundColor: 'white',
        
        // ✅ Make it rounded
        borderRadius: 50, // Ensures a circular shape
        width: 50, // Adjust width to maintain circular shape
        height: 50, // Adjust height to maintain circular shape
        justifyContent: 'center', // Center icon inside
        alignItems: 'center', // Center icon inside

        // ✅ Add shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,

        // ✅ Add elevation for Android
        elevation: 10,
    },
    title: {
        // position: 'relative',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        // marginBottom: 20,
        // paddingLeft: 50,
    },
})