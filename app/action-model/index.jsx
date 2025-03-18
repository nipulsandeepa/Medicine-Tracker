import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Colors from './../../constant/Colors';
import MedicationCardItem from '../../components/MedicationCarditem';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import {db} from './../../configs/FirebaseConfig'
import { doc} from 'firebase/firestore';
import moment from "moment/moment"
import { Alert } from 'react-native';



export default function MedicationActionModel() {
  const medicine = useLocalSearchParams();
  console.log("🔍 Received Params:", medicine);

  const router = useRouter();

  const UpdateActionStatus = async (status) => {
    try {
      if (!medicine?.docId) {
        console.log("❌ Error: docId is missing");
        return;
      }
  
      const docRef = doc(db, 'medication', medicine.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medicine?.selectedDate,
        }),
      });
  
      Alert.alert(status, 'Response Saved!', [
        {
          text: 'Ok',
          onPress: () => router.replace('(tabs)'),
        },
      ]);
    } catch (e) {
      console.log("🔥 Firebase Error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/images/notification.gif')}
        style={{ width: 120, height: 120 }}
      />
    
      
      {/* Check if data exists before displaying */}
      <Text style={styles.dateText}>{medicine?.selectedDate || "No Date Found"}</Text>
      {medicine?.reminder ? (
        <>
          <Text style={styles.reminderText}>{medicine.reminder}</Text>
          <Text>It's Time to Take Your Medication!</Text>
        </>
      ) : (
        <Text style={styles.warningText}>⚠ No Reminder Found</Text>
      )}

      {/* Pass only necessary props */}
      {/* <MedicationCardItem medicine={{ name: medicine?.name || "Unknown", reminder: medicine?.reminder || "No Reminder" }} /> */}

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.closeButton}
        onPress={()=>UpdateActionStatus('Missed')}
        >
          <Ionicons name="close-outline" size={24} color="black" />
          <Text style={styles.missedText}>Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.successButton}
           onPress={()=>UpdateActionStatus('Taken')}
        >
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text style={styles.successText}>Taken</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={()=>router.back()}
        style={{
        position:'absolute',
        bottom:25,

      }}>
        <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
      </TouchableOpacity>
      



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // ✅ Ensures it fills the screen
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white' // ✅ Ensures visibility
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  reminderText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.PRIMARY
  },
  warningText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 10
  },
  closeButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10
  },
  missedText: {
    fontSize: 20,
    color: 'red'
  },
  successButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
    borderRadius: 10
  },
  successText: {
    fontSize: 20,
    color: 'white'
  }
});
