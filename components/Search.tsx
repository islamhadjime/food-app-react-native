import { setSearchValue } from '@/redux/filter/slice';
import { useAppDispatch } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputChangeEventData, View } from 'react-native';

const Search = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const [showClear, setShowClear] = useState<boolean>(false);

  // Создаем отложенную функцию для dispatch
const debouncedSearch = useCallback(
  debounce((searchValue: string) => {
    dispatch(setSearchValue(searchValue));
  }, 300),
  [dispatch]
);

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newValue = e.nativeEvent.text;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    dispatch(setSearchValue("")); 
    debouncedSearch.cancel(); 
  };

  useEffect(() => {
    setShowClear(value.length > 0);
  }, [value]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {showClear ? (
          <Pressable onPress={handleClear}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        ) : (
          <Ionicons name="search" size={24} color="black" />
        )}
      </View>
      <View style={styles.input_content}>
        <TextInput
          placeholder="Search"
          value={value}
          onChange={handleChange}
          style={styles.input}
          underlineColorAndroid="transparent"
          clearButtonMode="never" // Отключаем встроенную кнопку очистки
        />
      </View>
    </View>
  );
};
export default Search

const styles = StyleSheet.create({
  container: {
    width:"80%",
    backgroundColor:'#FFF',
    height:60,
    borderRadius:20,
    padding:10,
    flexDirection:"row",
    alignItems:'center',
    gap:10,
    boxShadow:'0px 4px 19px rgba(0, 0, 0, 0.25)',
    overflow:"hidden"
  },
  icon: {
    width:30,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  input_content: {
    width:"100%",
    height:"100%",
  },
  input: {
    padding: 10,
  }
})