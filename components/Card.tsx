
import { selectCartItemById } from '@/redux/cart/selector';
import { addItem, removeItem } from '@/redux/cart/slice';
import { CartItem } from '@/redux/cart/types';
import { Product } from '@/redux/products/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/store';


const Card:React.FC<{item:Product}> = ({item}) => {
  const dispatch = useAppDispatch()
  const cartItem = useAppSelector(selectCartItemById(item.id.toString()))
  const router = useRouter()


  const onClickAdd = () =>{
    const  itemCard:CartItem ={
      id:item.id,
      title:item.title,
      description:item.description,
      price:Number(item.price),
      imageUrl:item.image,
      count:1
    }
    dispatch(addItem(itemCard))
  }

  const onClickRemove = () =>{
    dispatch(removeItem(item.id))
  }

  
  
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push(`/recipe/${item.id}`)}>
        <View style={styles.image}>
          <Image
            source={{ uri: item.image }}
            style={styles.image_card}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text style={{fontSize:12}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={{fontWeight:"bold"}}>{item.price}</Text>
        <View>
            {
              cartItem
              ?
              <TouchableOpacity onPress={onClickRemove}>
                <AntDesign name="heart" size={24} color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={onClickAdd}>
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            }
        </View>
      </View>
    </View>
  )
}

export default Card




const styles = StyleSheet.create({
  container: {
    marginRight:22,
    marginBottom:30,
    width:185,
    height:225,
    borderRadius:20,
    backgroundColor:"#FFF",
    padding:10,
    flexDirection:"column",
    alignItems:"flex-start",
    gap:10,
    boxShadow:"0px 6px 17px rgba(0, 0, 0, 0.13)"
  },
  image: {
    width:'100%',
    maxHeight:110,
    alignItems:"center",
    justifyContent:"center",
    overflow:"hidden",
},
  image_card: {
    width: 170,
    height: 110,
    borderRadius: 10,
    marginBottom:10,
  },
  content: {
    flexDirection:"column",
    alignItems:"flex-start",
  },
  footer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"100%",
  }
})