import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TypeList, WhenToTake } from '../constant/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText, formatTime,getDatesRange } from '../service/ConvertDate';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfig';
import { getLocalStorage } from '../service/Storage'; // Ensure this is correctly imported
import { useRouter } from 'expo-router';

const Colors = {
  PRIMARY: '#3498db',
  DARK_GRAY: '#34495e',
  GRAY: '#bdc3c7',
};

export default function AddMedicationForm() {
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log('Updated Form Data:', formData); // Debugging log
  };

  const SaveMedication = async () => {
    console.log('📌 Form Data Before Save:', formData);

    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');
    
    console.log('🔍 User Details:', user);

    if (!user || !user.email) {
      Alert.alert('Error', 'User not found. Please log in again.');
      return;
    }

    /*if (!(formData.name && formData.type && formData.dose && formData.enddate && formData.startdate && formData.reminder)) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }*/

    const dates=getDatesRange(formData?.startdate,formData?.enddate);
   console.log(dates);
    setLoading(true);

    try {
      await setDoc(doc(db, 'medication', docId), {
        ...formData,
        userEmail: user.email,
        docId: docId,
        dates:dates
      });

      console.log('✅ Data successfully saved to Firestore!');
      Alert.alert('Success', 'Medication added successfully!',[
       {
        text:'ok',
        onPress:()=>router.push('(tabs)')
       }

      ]);
      setFormData({}); // Clear form after save

    } catch (error) {
      console.error('❌ Firestore Write Error:', error);
      Alert.alert('Error', `Failed to save medication: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10, backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white' },
            ]}
            onPress={() => onHandleInputChange('type', item)}
          >
            <Text style={[styles.typeText, { color: item.name === formData?.type?.name ? 'white' : 'black' }]}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose input */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Dose (e.g., 2, 5ml)"
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      {/* When to take dropdown */}
      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue) => onHandleInputChange('when', itemValue)}
          style={{ width: '90%' }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and End Date */}
      <View style={styles.dateGroup}>
        <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} onPress={() => setShowStartDate(true)}>
          <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
          <Text style={styles.textInput}>{formatDateForText(formData?.startdate) ?? 'Start Date'}</Text>
        </TouchableOpacity>

        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange('startdate', FormatDate(event.nativeEvent.timestamp));
              setShowStartDate(false);
            }}
            value={formData?.startdate ? new Date(formData.startdate) : new Date()}
          />
        )}

        <TouchableOpacity style={[styles.inputGroup, { flex: 1 }]} onPress={() => setShowEndDate(true)}>
          <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
          <Text style={styles.textInput}>{formatDateForText(formData?.enddate) ?? 'End Date'}</Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange('enddate', FormatDate(event.nativeEvent.timestamp));
              setShowEndDate(false);
            }}
            value={formData?.enddate ? new Date(formData.enddate) : new Date()}
          />
        )}
      </View>

      {/* Reminder Time */}
      <View style={styles.dateGroup}>
        <TouchableOpacity style={[styles.inputGroup, { flex: 1, marginBottom: 5 }]} onPress={() => setShowTimePicker(true)}>
          <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
          <Text style={styles.text}>{formData?.reminder ?? 'Select Reminder'}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            onHandleInputChange('reminder', formatTime(event.nativeEvent.timestamp));
            setShowTimePicker(false);
          }}
          value={new Date()}


        />
      )}

      <TouchableOpacity style={styles.button} onPress={SaveMedication} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Add New Medication'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 25, fontWeight: 'bold' },
  inputGroup: { flexDirection: 'row', padding: 12, borderWidth: 1, borderRadius: 8, borderColor: Colors.DARK_GRAY, alignItems: 'center', marginTop: 8, backgroundColor: 'white' },
  textInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  button: { padding: 15, backgroundColor: Colors.PRIMARY, width: '100%', borderRadius: 15, marginTop: 25 },
  buttonText: { fontSize: 17, color: 'white', textAlign: 'center' },
});

