import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const InfoHead = () => {
  return (
    <View style={{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      padding:20
    }}>
      <View style={{
        flexDirection:"column",
        alignItems:"flex-start",
        marginBottom:20
      }}>
        <Text
            style={{
                fontSize:30,
                fontWeight:"bold",
                color:'#3C2F2F'
            }}
        >Foodgo</Text>
        <Text
            style={{
                fontSize:16,
                color:'#6A6A6A'
            }}
        >Order your favourite food!</Text>
      </View>
      <View style={{ alignItems:"center" }}>
         <Image source={{ uri: 'https://avatars.mds.yandex.net/i?id=2e68cb1b1f9d93a498df8312b31394a5_l-5298175-images-thumbs&n=13' }} style={{ width: 85, height: 85 }} />
      </View>
    </View>
  )
}

export default InfoHead

const styles = StyleSheet.create({})