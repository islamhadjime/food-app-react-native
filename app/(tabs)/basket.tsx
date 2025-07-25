import { addItem, minusItem, removeItem } from '@/redux/cart/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const basket = () => {
  
  const dispatch = useAppDispatch()
  const { items, totalPrice } = useAppSelector(state => state.cart)


  const handleRemove = (id: number) => {
    dispatch(removeItem(id))
  };

  const plus = (id: number) =>{
    const item = items.find(obj => obj.id === id)
    dispatch(addItem(item!))
  }

  const minus = (id: number) =>{
    dispatch(minusItem(id))
  }
  const countProduct = items.reduce((sum: any, obj: any) => {
    return obj.count + sum
  }, 0);




  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.head_text}>Корзина</Text>
      </View>
      <View style={styles.lister}>
        {
          items?.map(item =>(
            <>
            <View style={styles.item} key={item.id} >
              <View style={styles.image_block}>
                <Image  source={{uri:item.imageUrl}} style={{width:75,height:75,borderRadius:10,objectFit:"cover"}}/>
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price} ₽</Text>
              </View>
              <View style={styles.counter}>
                <TouchableOpacity style={styles.btn_block} onPress={() => minus(item.id)}>
                  <Text style={styles.btn_block_text}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counter_text}>{item.count}</Text>
                <TouchableOpacity style={styles.btn_block} onPress={() => plus(item.id)}>
                  <Text style={styles.btn_block_text}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_block}  onPress={() => handleRemove(item.id)}>
                  <AntDesign name="delete" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
            </>
          ))
        }

      </View>
      <View style={styles.footer}>
        <View style={styles.footer_item}>
          <Text style={styles.footer_item_title} >количество товаров:</Text>
          <Text style={styles.footer_item_description}>{items.length}</Text>
        </View>
        <View style={styles.footer_item}>
          <Text style={styles.footer_item_title} >общая количество продуктов:</Text>
          <Text style={styles.footer_item_description}>{countProduct}</Text>
        </View>
        <View style={styles.footer_item}>
          <Text style={styles.footer_item_title_bold} >Итого:</Text>
          <Text style={styles.footer_item_description_bold}>{totalPrice} ₽</Text>
        </View>
        <TouchableOpacity style={styles.footer_item} onPress={()=>alert("Заказ оформлен")}>
          <Text style={styles.notion_kasket}>Оформить заказ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footer_item} onPress={()=>router.push("/")}>
          <Text style={styles.notion_redirect}>Продолжить покупки</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default basket

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F5F5F5",
    paddingTop:49,
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"space-between"
  },

  head:{
    width:"100%",
    height:50,
    backgroundColor:"#EF2A39",
    alignItems:"flex-start",
    justifyContent:"center",
  },
  head_text: {
    fontSize:20,
    lineHeight:27,
    color:'#ffffff',
    fontWeight:"700",
    marginLeft:20
  },
  lister: {
    width:"100%",
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"flex-start",
    padding:10,
    marginTop:20,
    marginBottom:20
  },
  item: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:20,
    width:"100%",
    padding:10,
    backgroundColor:"#FFF",
    borderRadius:10,
    boxShadow:"0px 6px 17px rgba(0, 0, 0, 0.13)"
  },
  image_block: {
    width:75,
    height:75,
    backgroundColor:"#e4e1e1",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10
  },
  content: {
    width:150,
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"space-between",
  },
  title: {
    fontSize:15,
    lineHeight:27,
    color:'#3C2F2F',
    fontWeight:"500"
  }
  ,
  description: {
    fontSize:13,
    lineHeight:24,
    color:'#6A6A6A',
    fontWeight:"400"
  }
  ,
  price: {
    fontSize:17,
    lineHeight:27,
    color:'#3C2F2F',
    fontWeight:"700"
  },

   counter_text: {
    fontSize:14,
    lineHeight:27,
    color:'#3C2F2F'

  },
  counter: {
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  },
  btn_block: {
    width:40,
    height:40,
    backgroundColor:"#EF2A39",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  },
  btn_block_text: {
    fontSize:30,
    color:'#F5F5F5'
  },


  footer:{
    padding:10,
    backgroundColor:"#FFF",
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },

  footer_item:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:20
  },


  footer_item_title:{},
  footer_item_description:{},

  footer_item_title_bold:{
    fontSize:17,
    lineHeight:27,
    color:'#3C2F2F',
    fontWeight:"700"
  },
  footer_item_description_bold:{
    fontSize:17,
    lineHeight:27,
    color:'#3C2F2F',
    fontWeight:"700"
  },

  notion_kasket:{
    width:"100%",
    color:'#fffcfc',
    backgroundColor:"#fc0015",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    padding:10
  },
  notion_redirect:{
    width:"100%",
    color:'#2c2c2c',
    borderRadius:10,
    borderWidth:1,
    borderColor:"#a7a7a7",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    padding:10
  }




})