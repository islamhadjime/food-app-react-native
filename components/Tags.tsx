
import { setTag } from '@/redux/filter/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const Tags = ({title,id}:{title:string,id:number}) => {
  const dispatch = useAppDispatch()

  const selectedTags = useAppSelector(state => state.filter.tag)


  const onPressTag = () => {
    dispatch(setTag({ id, title }));
  };

  const isActive = selectedTags === title;

  return (
      <>
        <View style={styles.tags}>
              <TouchableOpacity style={isActive ? styles.active : styles.tag} onPress={onPressTag}>
                <Text style={{color:isActive ? '#F5F5F5' : '#3C2F2F'}}>{title}</Text>
              </TouchableOpacity>
        </View>
      </>
  )
}

export default Tags



const styles = StyleSheet.create({

  tags: {
    flexDirection:"row",
    alignItems:"center",
    gap:30,
    position:'relative',
    zIndex: 1,
  },
  active: {
    backgroundColor:"#EF2A39",
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    color:'#F5F5F5',
    padding:10,
    marginRight:10,
  },
  tag:{
    backgroundColor:"#e4e1e1",
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
        marginRight:10,
  }
})