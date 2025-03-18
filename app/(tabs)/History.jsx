/*import { View, Text,StyleSheet ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import moment from "moment/moment";
import { getDatesRangeToDisplay } from './../../service/ConvertDate';
import Colors  from './../../constant/Colors'

import { getLocalStorage } from './../../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';


import EmptyState from './../../components/EmptyState'
import { FlatESLint } from 'eslint/use-at-your-own-risk';


export default function History() {
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [dateRange, setDateRange] = useState([]);
  const [loading,setloading] = useState(false);
  const [medList,setMedList] =useState();


  useEffect(() => {
    GetDateList();
    GetMedicationList(selectedDate);

  }, []);




  const GetDateList=()=>{
    const dates=getDatesRangeToDisplay();
    setDateRange(dates);
  }

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

<FlatList 
    data={[]}
    ListHeaderComponent={
    <View style={styles.mainContainer}>
      
        <Image source={require('./../../assets/images/med-history.png')}

       style={styles.imagebanner}
      />
      <Text style={styles.header}>Medication History</Text>

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
        //ListEmptyComponent={<EmptyState />} 
       
      />:
        <Text style={
          {
            fontSize:25,
            padding:30,
            fontWeight:'bold',
            color:Colors.GRAY,
            textAlign:'center'

          }
        }>No Medication Found</Text>
    </View>}
    />
  )
}


const styles =StyleSheet.create(
  {
    mainContainer:{
    padding:25,
    backgroundColor:'white',
    height:'100%'

   },

   imagebanner:{
    width:'100%',
    height:200,
    borderRadius:15
   },

   header:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:20
   },

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
  }
)*/



import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from "moment/moment";
import { getDatesRangeToDisplay } from './../../service/ConvertDate';
import Colors from './../../constant/Colors'
import { getLocalStorage } from './../../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import EmptyState from './../../components/EmptyState';
import MedicationCardItem from './../../components/MedicationCarditem'

export default function History() {
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [dateRange, setDateRange] = useState([]);
  const [loading, setloading] = useState(false);
  const [medList, setMedList] = useState([]);  // ✅ Initialize as empty array

  useEffect(() => {
    GetDateList();
    GetMedicationList(selectedDate);
  }, []);

  const GetDateList = () => {
    const dates = getDatesRangeToDisplay();
    setDateRange(dates);
  };

  const GetMedicationList = async (selectedDate) => {
    setloading(true);
    setMedList([]);  

    const user = await getLocalStorage('userDetail');
    if (!user?.email) {
      console.error("❌ No user email found in local storage");
      setloading(false);
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
        setMedList([]);
      } else {
        const medications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedList(medications);
      }
    } catch (e) {
      console.error("❌ Error fetching medications:", e);
    } finally {
      setloading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>

      {/* ✅ Header & Date Selector */}
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <Image source={require('./../../assets/images/med-history.png')} style={styles.imagebanner} />
            <Text style={styles.header}>Medication History</Text>

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
          </>
        }
      />

      {/* ✅ Medication List */}
      <FlatList
        data={medList}
        keyExtractor={(item, index) => item.id || index.toString()} 
        renderItem={({ item }) =>
          item?.name ? (
            <TouchableOpacity onPress={() =>
              router.push({
                pathname: '/action-model',
                params: {
                  ...item,
                  selectedDate: selectedDate,
                }
              })
            }>
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.noDataText}>No Medication Found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',
    height: '100%',
  },
  imagebanner: {
    width: '100%',
    height: 200,
    borderRadius: 15
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20
  },
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
  },
  noDataText: {
    fontSize: 25,
    padding: 30,
    fontWeight: 'bold',
    color: Colors.GRAY,
    textAlign: 'center'
  }
});
