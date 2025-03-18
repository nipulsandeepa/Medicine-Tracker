
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDatesRangeToDisplay } from './../service/ConvertDate';
import { FlatList } from 'react-native';
import Colors from '../constant/Colors';
import moment from "moment/moment";
import { getLocalStorage } from '../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../configs/FirebaseConfig';
import MedicationCardItem from './MedicationCarditem';
import EmptyState from './EmptyState';
import { useRouter } from 'expo-router';




export default function MedicationList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();



  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);

  useEffect(() => {
    console.log("Updated medList:", medList); // ✅ Debugging
  }, [medList]);

  const GetDateRangeList = () => {
    const dates = getDatesRangeToDisplay();
    setDateRange(dates);
  };

  const GetMedicationList = async (selectedDate) => {
    setIsLoading(true);
    setMedList([]);  // ✅ Clear previous data

    const user = await getLocalStorage('userDetail');
    if (!user?.email) {
      console.error("❌ No user email found in local storage");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Fetching medications for date:", selectedDate);
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No medications found for this date.");
        setMedList([]);  // ✅ Ensure state is updated to empty
      } else {
        const medications = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.name && Object.keys(item).length > 0); // ✅ Filter out empty objects

        console.log("✅ Medications:", medications);  
        setMedList(medications);
      }
    } catch (e) {
      console.error("❌ Error fetching medications:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 25, alignItems: 'center' }}>
      {/* <Image 
        source={require('./../assets/images/nipul.png')}
        style={{ width: '70%', height: '20%' }}
      /> */}

      {/* Date Selector */}
      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dateGroup, { backgroundColor: item.formatedDate === selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY }]}
            onPress={() => {
              setSelectedDate(item.formatedDate);
              GetMedicationList(item.formatedDate);
            }}
          >
            <Text style={[styles.day, { color: item.formatedDate === selectedDate ? 'white' : 'black' }]}>{item.day}</Text>
            <Text style={[styles.date, { color: item.formatedDate === selectedDate ? 'white' : 'black' }]}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Medication List */}
      {/* <FlatList
        data={medList}
        keyExtractor={(item, index) => item.id || index.toString()} // ✅ Ensure unique keys
        renderItem={({ item }) => 
          item?.name ? ( // ✅ Only render if item has valid data
            <TouchableOpacity>
              <MedicationCardItem medicine={item} />
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={<EmptyState />} // ✅ Show EmptyState if no meds
      /> */}

<FlatList
        data={medList}
        keyExtractor={(item, index) => item.id || index.toString()} // ✅ Ensure unique keys
        renderItem={({ item }) => 
          item?.name ? ( // ✅ Only render if item has valid data
            <TouchableOpacity onPress={(()=>
      
              router.push(
              {
                pathname:'/action-model',
                params:{
                  ...item,
                  selectedDate:selectedDate,
                
                }
              }
              ))}>
              <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={<EmptyState />} // ✅ Show EmptyState if no meds
      />



    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    height: 100
  },
  day: {
    fontSize: 20
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold'
  }
});