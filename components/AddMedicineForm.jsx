import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    Dimensions, 
    TextInput, 
    TouchableOpacity,
    Alert,
    ToastAndroid,
    FlatList,
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard
} from 'react-native';import React, { useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Types, WhenToTake} from './../constant/Options';
import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, FormatDateForText, FormatTime } from '../service/ConvertDateTime';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function AddMedicineForm() {

    const [formData, setFormData] = useState();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const onHandleInputChange = (field, value) => {
        setFormData(prev=>({
            ...prev,
            [field]:value
        }));
        console.log(formData);
    }

  return (
        <View style={{ padding: 25 }}>
          <Text style={styles.Header}>Add new </Text>

          {/* Medicine Name */}
          <View style={styles.inputGroup}>
            <FontAwesome6 name="suitcase-medical" size={24} color="blue" />

            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              placeholderTextColor="grey"
              // value={email}
              // onChangeText={setEmail}
              // keyboardType="email-address"

              onChangeText={(value) => onHandleInputChange("Name", value)}
            />
          </View>

          {/* Medicine Type List - Flat list */}
          <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
            Medicine Type
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Types} // ✅ Updated reference
            keyExtractor={(item, index) => index.toString()} // ✅ Prevents errors
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  { marginRight: 10 },
                  {
                    backgroundColor:
                      item.name == formData?.type?.name
                        ? "rgb(83, 67, 177)"
                        : "white",
                  },
                ]}
                onPress={() => onHandleInputChange("type", item)}
              >
                <Text
                  style={[
                    styles.listText,
                    {
                      color:
                        item.name == formData?.type?.name ? "white" : "black",
                    },
                  ]}
                >
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Dosages */}
          <View style={styles.dosageInputGroup}>
            <Ionicons name="eyedrop-sharp" size={24} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Dosage ex, 5(ml)"
              placeholderTextColor="grey"
              // value={email}
              // onChangeText={setEmail}
              // keyboardType="email-address"

              onChangeText={(value) => onHandleInputChange("Dose", value)}
            />
          </View>

          {/* When To Take Dropdown - Picker */}
          <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
            Select when to take Medication...
          </Text>
          <View style={styles.dosageInputGroup}>
            <MaterialIcons name="access-time-filled" size={24} color="black" />
            <Picker
              selectedValue={formData?.when}
              onValueChange={(itemValue) =>
                onHandleInputChange("when", itemValue)
              }
              style={{ width: "90%" }}
            >
              {WhenToTake.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} /> // ✅ Fix: Correct `Picker.Item`
              ))}
            </Picker>
          </View>

          {/* Start and End date - Date picker */}
          <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
            Medication period
          </Text>
          <View>
            {/* Stare date */}
            <TouchableOpacity
              style={styles.dateInputGroup}
              onPress={() => setShowStartDate(true)}
            >
              <MaterialIcons name="date-range" size={24} color="black" />

              <Text style={{ fontSize: 20, color: "grey" }}>
                {FormatDateForText(formData?.startDate) ?? "Select"}
              </Text>
              <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
                Start Date (From)
              </Text>
            </TouchableOpacity>
            {showStartDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  onHandleInputChange(
                    "startDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowStartDate(false);
                }}
                value={new Date(formData?.startDate) ?? new Date()}
              />
            )}
            {/* End date */}
            <TouchableOpacity
              style={styles.dateInputGroup}
              onPress={() => setShowEndDate(true)}
            >
              <MaterialIcons name="date-range" size={24} color="black" />

              <Text style={{ fontSize: 20, color: "grey" }}>
                {FormatDateForText(formData?.endDate) ?? "Select"}
              </Text>
              <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
                End Date (To)
              </Text>
            </TouchableOpacity>
            {showEndDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  onHandleInputChange(
                    "endDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowEndDate(false);
                }}
                value={new Date(formData?.endDate) ?? new Date()}
              />
            )}
          </View>

          {/* Reminder */}
          <View>
            <Text style={{ fontSize: 16, color: "grey", marginTop: 20 }}>
              Select Reminder Time
            </Text>
            <TouchableOpacity
              style={styles.dateInputGroup}
              onPress={() => setShowTime(true)}
            >
              <MaterialCommunityIcons name="reminder" size={24} color="black" />

              <Text style={{ fontSize: 20, color: "grey" }}>
                {formData?.reminder ?? "Set Time"}
              </Text>
              <Text
                style={{ fontSize: 16, color: "grey", marginTop: 20 }}
              ></Text>
            </TouchableOpacity>
          </View>
          {showTime && (
            <RNDateTimePicker
              mode="time"
              onChange={(event) => {
                onHandleInputChange(
                  "reminder",
                  FormatTime(event.nativeEvent.timestamp)
                );
                setShowTime(false);
              }}
              value={new Date(formData?.reminder) ?? new Date()}
            />
          )}

          {/* Save Button */}
          <View style = {{paddingTop: 35, paddingBottom: 35}}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push('/add-new-medicine')}
            >
                <Text style={styles.buttonText}>Add Medicine</Text>
            </TouchableOpacity>
          </View>


        </View>
  );
}


// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    Header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        // width: '100%',
        height: 40,
        backgroundColor: 'rgba(150, 157, 209, 0.25)',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'black',
        // marginBottom: 10,
    },
    inputGroup:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
    },  
    dosageInputGroup:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        // justifyContent: 'space-between',
        padding: 12,
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: 'grey',
    },
    dateInputGroup:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
    },  
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',

        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        // borderColor: 'grey',
    },
    listText: {
        fontSize: 16,
        color: 'black',
        // paddingRight: 10,
    },
    button: {
        backgroundColor: 'rgb(7, 156, 214)',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})