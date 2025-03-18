import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../service/Storage'
import AntDesign from '@expo/vector-icons/AntDesign';

import Colors from './../constant/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header() {
 
  const [user,setUser] = useState();
  const router = useRouter();

     useEffect( ()=>
     {
        GetUserDetail();
     },[])


    const GetUserDetail= async()=>
    {
        const userInfo = await getLocalStorage('userDetail');
        console.log(userInfo);
        setUser(userInfo);
    }
 
    return (
    <View style={{
        marginTop:20

    }}>
     
     <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        //height:'100%'

     }}>
     
     <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,

     }}>
        <Image source={require('./../assets/images/star.png') }
        style={{
            width:45,
            height:45
        }}
  />
        <Text style={{
            fontSize:30,
            fontWeight:'bold',

        }}>
             Hello {user?.name || "User"} 👋
        </Text>
           </View>
             <TouchableOpacity onPress={()=>router.push('/add-new-medication')}>
           <Ionicons name="medkit-outline" size={34} color={Colors.PRIMARY}/>
           </TouchableOpacity>
     </View>
    </View>
  )
}