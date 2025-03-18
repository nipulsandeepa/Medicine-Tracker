import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { auth } from '../../configs/FirebaseConfig'
import { signOut } from 'firebase/auth'

import { RemoveLocalStorage } from '../../service/Storage'
import Header from '../../components/Header'
import EmptyState from '../../components/EmptyState'
import MedicationList from '../../components/MedicationList'
import MedicationCardItem from '../../components/MedicationCarditem'
import { FlatList } from 'react-native'



export default function index() {

    return (
      <FlatList
      data={[]}
      ListHeaderComponent={

   <View style={{
      padding:30,
      backgroundColor:'white',
      height:'100%',
      width:'100%'
    }}>
        

        <Header/>
        
        <MedicationList/>
        <MedicationCardItem/>
    </View>

      }

      />
 


  )
}