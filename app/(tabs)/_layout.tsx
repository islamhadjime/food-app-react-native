import { useAppSelector } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  const { items } = useAppSelector(state => state.cart)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffb2b2',
        tabBarShowLabel: false,
        tabBarStyle:{
          backgroundColor: '#EF2A39',
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 5
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <View
            style={{
              position: "relative",
            }}
          >
            <Ionicons name="basket" size={28} color={color} />
            
          </View>,
          
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper" size={28} color={color} />,
        }}
      />

    </Tabs>
  );
}
