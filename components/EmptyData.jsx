import { 
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';import React from 'react'

export default function EmptyData() {
  return (
    <View style = {styles.container}>
        <Text style={{fontSize: 124}}>🤔</Text>
        <Text style = {styles.noData}>No data yet !</Text>
        <Text style = {styles.noData_Sub}>You have no data here, Kindly setup...</Text>
        
        <View style = {{paddingTop: 20, width: '100%'}}>
            {/* Login Button */}
            <TouchableOpacity 
                style={styles.button} 
                // onPress={}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: width, // ✅ Better for responsiveness
        paddingHorizontal: 10, // ✅ Adds spacing from edges
        paddingVertical: 15, // ✅ Better spacing
        alignItems: 'center',
        paddingTop: 45,
        gap: 5,

         // ✅ Proper shadow properties
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10, // ✅ Required for Android
    },
    noData: {
        paddingTop: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black'
    },
    noData_Sub: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: 'black'
    },
    button: {
        backgroundColor: 'rgb(7, 156, 214)',
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
})