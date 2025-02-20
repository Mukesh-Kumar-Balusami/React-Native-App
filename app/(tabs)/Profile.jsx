import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { signOut } from 'firebase/auth'; // ✅ Import signOut
import { removeLocalStorage } from '../../service/Storage';
import { useRouter } from 'expo-router';


export default function Profile() {
 
   const router = useRouter();
 
   const onLogoutClick = async() => {
     try {
       await removeLocalStorage('userDetail'); // ✅ Clear user data
       await signOut(auth); // ✅ Properly call signOut
       console.log('User signed out successfully');
       router.replace('login'); // ✅ Redirect to login
     } catch (error) {
       console.error('Logout error:', error.message);
     }
   }
   return (
     <View>
       <Text>Profile</Text>
       {/* <Redirect href={'login'}/> */}
       <Button title='Logout' 
         onPress={onLogoutClick}/>
     </View>
   )
}