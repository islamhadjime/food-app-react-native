import { SortProperty } from '@/redux/filter/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { setSort } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';

interface IFilter{
  id:number,
  title:string,
  order: SortProperty
}

const filters:IFilter[] = [
  {
    id:1,
    title:"Все",
    order:SortProperty.RATING_NUll
  },
  {
    id:2,
    title:"Самый дешевый",
    order:SortProperty.RATING_ASC
  },
  {
    id:3,
    title:"Самый дорогой",
    order:SortProperty.RATING_DESC
  },
]
const Filter = () => {
  const dispatch = useAppDispatch()
  const [click,setClick] = React.useState<boolean>(false)
  const [activeFilter, setActiveFilter] = React.useState<number>(1); // По умолчанию "Все"

  const handleFilterPress = (id: number, order: SortProperty) => {
    setActiveFilter(id);
    dispatch(setSort(order));
    setClick(false);
  };

  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.icon} onPress={() => setClick(!click)}>
        <Ionicons name="filter" size={24} color="#FFF" />
      </TouchableOpacity>
      {
        click &&
        <View style={styles.content}>
          {
            filters.map(item => (
              <TouchableOpacity key={item.id} style={styles.container} onPress={() => handleFilterPress(item.id, item.order)}>
                <Text style={item.id == activeFilter ? styles.active : styles.text}>{item.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      }
    </View>
  )
}



export default Filter

const styles = StyleSheet.create({
  container: {
    width:60,
    height:60,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#EF2A39",
    borderRadius:20,
    position:'relative',
    zIndex:2,
  },
  icon: {
    width:30,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  content:{
    position:'absolute',
    width:90,
    borderRadius:10,
    alignItems:"flex-start",
    gap:5,
    top:65,
    backgroundColor:"#EF2A39",
    padding:10,
    justifyContent:"center"
  }
,
  text: {
    fontSize:14,
    color:'#F5F5F5'
  },
  active: {
    fontSize:14,
    color:'#ffffff',
    fontWeight:"bold"
  }
})