/*import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

import { getLocalStorage } from '../../service/Storage';
import { FlatList } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';


export default function Profile() {
 
 const Menu =[
  
  {
    id: 4,
    name:'Add New Medication',
    icon: 'add-circle',
    path: '/add-new-medication'
    },
    
  {
    id: 5,
    name:'My Medication',
    icon: 'medkit',
    path: '(tabs)'
    },
    
  {
    id: 2,
    name:'History',
    icon: 'time',
    path: '/history'
    },
    {
    id: 4,
    name:'Logout',
    icon: 'exit',
    path: 'logout'
    }

 ]
const router =useRouter();

const onPressMenu = (menu) ={

}
useEffect(()=>{
    GetUser();
},[])
 

const GetUser = async()=>{
const userData=await getLocalStorage('userDetail');
 }
 
  return (
    <View style={{
        padding:25,
        backgroundColor:'white',
        height:'100%'


      }}>

      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Profile</Text>
     
  <view style={{
    display:'flex',
    alignItems:'center',
    marginVertical:25
  }}>


    <Image source={require('./../../assets/images/pills.png')}
    style={{
      width:100,
      height:100
    }} />


<FlatList
data={Menu}
renderItem={({ item,index })=>(
<TouchableOpacity
onPress={()=>onPressMenu(item)}
key={item.id}
style={{
  marginVertical:10,
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  gap:10,
  backgroundColor:'white',
  padding:10,
  borderRadius:10
}}>

<Ionicons name={item?.icon} size={30}
color={Colors.PRIMARY}
style={{
  padding:10,
  backgroundColor:Colors.LIGHT_GRAY,
  borderRadius:10
}}
/>
<Text style={{
  fontFamily:'outfit',
  fontSize:20,
}}>{item.name}</Text>

</TouchableOpacity>
)}

/>


  </view>

    </View>
  )
}*/



import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { getLocalStorage } from '../../service/Storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  const Menu = [
    {
      id: 1,
      name: 'Add New Medication',
      icon: 'add-circle',
      path: '/add-new-medication',
    },
    {
      id: 2,
      name: 'My Medication',
      icon: 'medkit',
      path: '(tabs)',
    },
    {
      id: 3,
      name: 'History',
      icon: 'time',
      path: 'History',
    },
    {
      id: 4, // Changed to a unique ID
      name: 'Logout',
      icon: 'exit',
      path: 'logout',
    },
  ];

  const onPressMenu = (menu) => {
    if (menu.path === 'logout') {
      // Clear user session
      getLocalStorage('userDetail').then(() => {
        router.replace('/login'); // Redirect to Sign In
      });
    } else {
      router.push(menu.path);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const userData = await getLocalStorage('userDetail');
    console.log('User Data:', userData); // You might need to store this in state
  };

  return (
    <View style={{ padding: 25, backgroundColor: 'white', height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Profile</Text>

      <View style={{ display: 'flex', alignItems: 'center', marginVertical: 25 }}>
        <Image
          source={require('./../../assets/images/pills.png')}
          style={{ width: 100, height: 100 ,marginBottom:50}}
        />

        <FlatList
          data={Menu}
          keyExtractor={(item) => item.id.toString()} // Ensure unique keys
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPressMenu(item)}
              style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons
                name={item.icon}
                size={30}
                color={Colors.PRIMARY}
                style={{
                  padding: 10,
                  backgroundColor: Colors.LIGHT_GRAY,
                  borderRadius: 10,
                }}
              />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
