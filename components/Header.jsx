import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const userInfo = await getLocalStorage('userDetail');
            console.log("User Info:", userInfo);
            setUser(userInfo);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.hello}>
                    😉 Hello, <Text style={styles.title}>{user?.displayName || "Guest"}</Text>
                </Text>
                <Ionicons name="settings" size={24} color="black" />
            </View>
        </View>
    );
}

// Get screen dimensions
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: width, // ✅ Better for responsiveness
        paddingHorizontal: 10, // ✅ Adds spacing from edges
        paddingVertical: 15, // ✅ Better spacing

         // ✅ Proper shadow properties
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10, // ✅ Required for Android
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    hello: {
        fontSize: 24,
        fontWeight: '600', // ✅ Corrected
        color: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});
