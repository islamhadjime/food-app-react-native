import { addItem, minusItem } from "@/redux/cart/slice";
import { Product } from "@/redux/products/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const recipe= () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cart)
  const { id:recipedId } = useLocalSearchParams();
  const router = useRouter()

  const [card, setCard] = React.useState<Product>()
  const [loading,setLoading] =React.useState<boolean>(false)


  const fetchGetCard = async () =>{
    try {
      setLoading(true)
      const res = await fetch(`https://687a7f48abb83744b7ed1315.mockapi.io/foods/${recipedId}`,{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setCard(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setLoading(false)
    }
  }
  

  React.useEffect(() => {
    fetchGetCard()
  },[])


  

  
  if(loading){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }


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
      <View style={styles.top}>
        <View style={styles.image}>
          <Image
            source={{ uri: card?.image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{card?.title}</Text>
          <View style={styles.tags}>
            {
              card?.tags.map((item,index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tag_text}>{item}</Text>
                </View>
              ))
            }
          </View>
          <Text style={styles.des}>{card?.description}</Text>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity style={styles.minus}>
            <Text style={styles.minus_text}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter_text}>1</Text>
          <TouchableOpacity style={styles.plus}>
            <Text style={styles.plus_text}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.price}>
            <Text style={styles.price_text}>${card?.price}</Text>
        </View>
        <View style={styles.order}>
          <Text style={styles.order_text}>
             ORDER NOW
          </Text>
        </View>
      </View>
    </View>
  )
}

export default recipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:'space-between',
    backgroundColor: '#F5F5F5',
    paddingTop:29,
    paddingHorizontal:20,
    paddingBottom:20,
  },
  top: {
    flexDirection:"column",
    alignItems:"flex-start",
    justifyContent:"space-between",
    marginBottom:20
  },
  image:{
    width:'100%',
    maxHeight:320,
    alignItems:"center",
    justifyContent:"center",
    overflow:"hidden",
  },
  image_card: {
    width:'100%',
    maxHeight:320,
    alignItems:"center",
    justifyContent:"center",
    overflow:"hidden",
  },

  content: {
    flexDirection:"column",
    alignItems:"flex-start",
    gap:10,
  },




  title: {
    fontSize:25,
    color:'#3C2F2F',
    lineHeight:34,
    fontWeight:"600",
    fontStyle:"normal"
  },
  tags: {
    flexDirection:"row",
    alignItems:"center",
    gap:30,
    marginBottom:23,
    marginTop:21,
  },
  tag:{},
  tag_text: {
    fontSize:16,
    color:'#6A6A6A',
    lineHeight:27,
    fontWeight:"400",
    fontStyle:"normal"
  },





  des: {
    fontSize:16,
    color:'#6A6A6A',
    lineHeight:27,
    fontWeight:"400",
    fontStyle:"normal"
  },



  counter_text: {
    fontSize:19,
    lineHeight:27,
    color:'#3C2F2F'

  },
  counter: {
    flexDirection:"row",
    alignItems:"center",
    gap:20,
    marginTop:20
  },
  minus: {
    width:40,
    height:40,
    backgroundColor:"#EF2A39",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  },
  minus_text: {
    fontSize:30,
    color:'#F5F5F5'
  },
  plus: {
    width:40,
    height:40,
    backgroundColor:"#EF2A39",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  },
  plus_text: {
    fontSize:30,
    color:'#F5F5F5'
  },
  bottom: {
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },




  price: {
    width:104,
    height:70,
    backgroundColor:"#EF2A39",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    boxShadow: '0px 9px 30px rgba(0, 0, 0, 0.25)'
  },




  price_text: {
    fontSize:22,
    lineHeight:30,
    color:'#FFFF',
    fontWeight:"600"
  },
  order: {
    width:239,
    height:70,
    backgroundColor:"#3C2F2F",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    boxShadow: '0px 9px 30px rgba(0, 0, 0, 0.25)'
  },
  order_text: {
    fontSize:22,
    lineHeight:30,
    color:'#FFFF',
    fontWeight:"600"
  }
})