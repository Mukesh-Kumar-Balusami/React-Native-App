import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AddMedicineHeader from '../../components/AddMedicineHeader'
import AddMedicineForm from '../../components/AddMedicineForm'

export default function AddNewMedicine() {
  return (
    <View>
        <AddMedicineHeader/>
    <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
            showsVerticalScrollIndicator={false}
    >
        <AddMedicineForm/>
    </ScrollView>
    </View>
  )
} //style = {{backgroundColor: 'grey'}}