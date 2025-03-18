import { View, Text, StyleSheet ,TextInput, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'

import {signInWithEmailAndPassword} from 'firebase/auth'

import {auth} from './../../configs/FirebaseConfig'
import { setLocalStorage } from '../../service/Storage'



export default function signin() {
 
   const router=useRouter();

   const [email,setEmail] = useState();
   const [password,setPassword] = useState();


   const OnSignIn =()=>{
   
    if(!email || !password)
    {
        ToastAndroid.show('Plase Fill the fields..',ToastAndroid.BOTTOM);
        //Alert.alert('Plase Fill the fields..');
        return;
    }
    
signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    await setLocalStorage('userDetail',user);
    router.replace('(tabs)')
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/inavlid-credentials')
    {
        ToastAndroid.show('Invalid Email or Password..',ToastAndroid.BOTTOM);
        //Alert.alert('Invalid Email or Password');
    }
    console.log(errorCode);
  });
   }
 
    return (
    <View style={{
        padding:25,

    }}>
      <Text style={styles.textheader}>Let's Sign You In..</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style>You've been missed!!</Text>
    
    <View style={{
        marginTop:25
    }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={styles.textInput}
        
        onChangeText={(value)=>setEmail(value)}
        
        />
    </View>

    <View style={{
        marginTop:25
    }}>
        <Text>Password </Text>
        <TextInput placeholder='Password' 
        secureTextEntry={true}
        style={styles.textInput}  
        
        onChangeText={(value)=>setPassword(value)}
    />
    </View>

    <TouchableOpacity style={styles.button}
    onPress={OnSignIn}>
        <Text style={{
            fontSize:17,
            color:'white',
            textAlign:'center',
        }}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonCreate}
    onPress={()=>router.push('login/signUp')}>
    
        <Text style={{
            fontSize:17,
            color:Colors.PRIMARY,
            textAlign:'center',
        }}>Create Account</Text>
    </TouchableOpacity>
    
    </View>
  
  )
}

const styles = StyleSheet.create
({
   textheader:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:15
   },

   subText:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:10,
    color:Colors.GRAY

   },
   textInput:{
    borderWidth:1,
    padding:10,
    fontSize:17,
    borderRadius:10,
    marginTop:5,
    backgroundColor:'white'

   },
   
   button:{
    padding:20,
    marginTop:35,
    backgroundColor:Colors.PRIMARY,
    borderRadius:10,

   },
   buttonCreate:{
    padding:20,
    marginTop:20,
    backgroundColor:'white',
    borderRadius:10,
    borderWidth:1,
    borderColor:Colors.PRIMARY


   }
   
})