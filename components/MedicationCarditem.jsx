/*import { View, Text,Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function MedicationCardItem({medicine,selectedDate=''}) {
    console.log("Rendering MedicationCardItem with:", medicine);

    const [status,setstatus] = useState();

  
    if (!medicine || !medicine.name) {
      return null;  // ✅ Prevents rendering an empty card
    }

useEffect(()=>{
 CheckStatus();
},[medicine])



const CheckStatus=()=>{
   const data=medicine?.action?.find((item)=>item.dates==selectedDate);
   console.log(data);
   setstatus(data);
}


    return (
      <View style={style.container}>

        <View style={style.subContainer}>
        <View style={style.imageContainer}>
            
           <Image source={{uri:medicine?.type?.icon}}
           style={{
            width:60,
            height:60
           }} 
           
           />

        </View>


            <View>
                <Text style={{fontSize:22,fontWeight:'bold'}}>{medicine?.name}</Text>
                <Text style={{fontSize:17}}>{medicine?.when}</Text>
                <Text style={{color:'white'}}>{medicine?.dose} {medicine?.type.name}</Text>
            </View>
        </View>

   <View style={style.reminder}>
   <Ionicons name="timer-outline" size={24} color="black" />
    <Text style={{fontWeight:'bold',fontSize:18}}>{medicine?.reminder}</Text>
   </View>

   {status?.dates&& <View style={StyleSheet.statusContainer}>
   <Ionicons name="checkmark-circle" size={24} color="green" />

   </View>}


      </View>
    )
  }


  const style= StyleSheet.create({

    container:{
      padding:10,
      //backgroundColor:'lightblue',
      borderWidth:1,
      borderColor:'lightgray',
      marginTop:10,
      borderRadius:15,
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'center'
    
    },

   imageContainer:{
   padding:10,
   backgroundColor:'white',
   borderRadius:15,
   marginRight:15
    },

    subContainer:{
       flexDirection:'row',
       alignItems:'center'
    },


    reminder:{
      backgroundColor:'white',
      borderRadius:13,
      padding:15,
      alignItems:'center'
    },

    statusContainer:{
      position:'absolute',
      top:5,
      padding:7
    }
  })*/





import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({ medicine, selectedDate = '' }) {
    console.log("Rendering MedicationCardItem with:", medicine);

    const [status, setstatus] = useState();

    if (!medicine || !medicine.name) {
        return null;  // ✅ Prevents rendering an empty card
    }

    useEffect(() => {
        CheckStatus();
    }, [medicine]);

    const CheckStatus = () => {
        const data = medicine?.action?.find((item) => item.date === selectedDate);
        console.log("Status Data:", data);
        setstatus(data);
    };

    return (
        <View style={style.container}>

            <View style={style.subContainer}>
                <View style={style.imageContainer}>
                    <Image source={{ uri: medicine?.type?.icon }}
                        style={{
                            width: 60,
                            height: 60
                        }}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{medicine?.name}</Text>
                    <Text style={{ fontSize: 17 }}>{medicine?.when}</Text>
                    <Text style={{ color: 'black' }}>{medicine?.dose} {medicine?.type?.name}</Text>
                </View>
            </View>

            <View style={style.reminder}>
                <Ionicons name="timer-outline" size={24} color="black" />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{medicine?.reminder}</Text>
            </View>

            {/* ✅ Correct Status Check */}
            {status?.date && 
              <View style={style.statusContainer}>
                  {status?.status=='Taken'?<Ionicons name="checkmark-circle" 
                    size={24} color="green" />:
                    status?.status=='Missed'&&
                    <Ionicons name="close-circle" 
                    size={24} color="red" />}
                </View>}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginTop: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },

    imageContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 15
    },

    subContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    reminder: {
        backgroundColor: 'white',
        borderRadius: 13,
        padding: 15,
        alignItems: 'center'
    },

    statusContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 7
    }
});



  