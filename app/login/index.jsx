import { View, Text, Image,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
 
  const router=useRouter();
 
  return (
   
    <View>
       <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:40
       }}>
        <Image source={require('./../../assets/images/doc.jpg')} 
      
         style={styles?.image}
        />
       </View>


          <View style={{
            padding:25,
            backgroundColor:Colors.PRIMARY ,
            height:'100%'
          }}>
            <Text style={{
              fontSize:30,
              fontWeight:'bold',
              color:'white',
              textAlign:'center'

            }}>Stay on Track, Stay Healthy..</Text>

            <Text style={{
              color:'white',
              textAlign:'center',
              fontSize:17,
              marginTop:20
            }}>Track your meds , Take control of your health,Stay consistent, stay confident... </Text>
          
          <TouchableOpacity style={styles.button}
          onPress={()=>router.push('login/signin')}
          >
           
            <Text style={{
              textAlign:'center',
              color:Colors.PRIMARY,

            }}>Continue</Text>
          </TouchableOpacity>


          <Text style={{
            color:'white',
            marginTop:4

          }}>Note: By clicking Continue button, you agree to our terms and conditions</Text>
          
          </View>


    </View>
  )
}

const styles = StyleSheet.create({
    image:{    
        width:350,
        height:350,
        borderRadius:23,
        marginBottom:30

    },

    button:{
       padding:15,
       backgroundColor:'white',
       borderRadius:99,
       marginTop:25,

          }

})