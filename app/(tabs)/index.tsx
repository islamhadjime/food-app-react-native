import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import InfoHead from '@/components/InfoHead'
import { selectFilter } from '@/redux/filter/selectors'
import { TagsItems } from '@/redux/filter/types'
import { fetchProducts } from '@/redux/products/asyncAction'
import { selectProducts } from '@/redux/products/selectors'
import { useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'

// Component
import Card from '@/components/Card'
import Filter from '@/components/Filter'
import Search from '@/components/Search'
import Tags from '@/components/Tags'


const Skeletion =()=>{
  return (
    <View style={{
      width:185,
      height:300,
      backgroundColor:"#adaaaa",
      borderRadius:20,
      margin:10
    }}>
    </View>
  )
}

const index = () => {
  const dispatch = useAppDispatch()
  const { items , status } = useSelector(selectProducts)
  const { search,categoryId,order,currentPage,tag} = useSelector(selectFilter)


  const getProduct= async () =>{
    dispatch(fetchProducts({order,tag,search}))
  }

  React.useEffect(()=>{
    getProduct()
  },[search,order,tag])


  return (
    <View style={styles.container}>
        <InfoHead/>
        <View style={styles.inner}>
          <Search/>
          <Filter/>
        </View>
        <View style={{marginBottom:20}}>
          <FlatList
          data={TagsItems}
          renderItem={({item})=>(<Tags title={item.title} id={item.id}/>) }
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
        </View>
        <FlatList
          numColumns={2}
          data={items}
          renderItem={({item})=>( status === 'loading' ? (<Skeletion/>) : (<Card item={item}/>) ) }
        />
  </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop:29,
    paddingHorizontal:20
  },
  inner: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:20
  }
})