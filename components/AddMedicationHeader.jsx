import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router'

export default function AddMedicationHeader() {
    const router = useRouter();

  return (
    <View>
     <Image source={require('./../assets/images/consult.png')}
     
     style={{
       width:'100%',
       height:280,
        
     }}
     />

     <TouchableOpacity style={{
        position:'absolute',
        padding:25
     }}
     onPress={()=>router.back()}
     >
     <AntDesign name="back" size={34} color="black" />
     </TouchableOpacity>
    </View>
  )
}