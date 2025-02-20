import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {

    const router=useRouter();
    
    useEffect(() => {
        GetUserDetails();
    }, [])
    
    const GetUserDetails = async() =>{
        const userInfo = await getLocalStorage('userDetail');
        if (!userInfo) {
            router.replace('login');
        }
    }
    
    
    
    
    // const [authenticated, setAuthenticated] = useState(null);
    // // If User Already loggin or not
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/auth.user
    //       const uid = user.uid;
    //       console.log('user id: ',uid);
    //       setAuthenticated(true);
    //       // ...
    //     } else {
    //         setAuthenticated(false);
    //       // User is signed out
    //       // ...
    //     }
    //   });

    //   useEffect(() => {
    //     if (authenticated==false) {
    //         router?.push('login');
    //     }
    //   })

  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        {/* Home */}
        <Tabs.Screen name='index'
            options={{
                tabBarLabel:"Home",
                tabBarIcon:({color,size})=>(
                    <FontAwesome name="home" size={size} color={color} />
                )
            }}
        />

        {/* Add New */}
        <Tabs.Screen name='AddNew'
             options={{
                tabBarLabel:"Add",
                tabBarIcon:({color,size})=>(
                    <Entypo name="squared-plus" size={size} color={color} />
                )
            }}
        />

        {/* Profile */}
        <Tabs.Screen name='Profile'
             options={{
                tabBarLabel:"Profile",
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="tag-faces" size={size} color={color} />
                )
            }}
        />
    </Tabs>
  )
}