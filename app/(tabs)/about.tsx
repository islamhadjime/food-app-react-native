import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const about = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/recipe.png')} // Замените на ваш логотип
          style={styles.logo}
        />
        <Text style={styles.appName}>FoodExpress</Text>
        <Text style={styles.version}>Версия 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>О приложении</Text>
        <Text style={styles.sectionText}>
          FoodExpress - это современное приложение для заказа еды с быстрой доставкой. 
          Мы предлагаем широкий ассортимент блюд из лучших ресторанов вашего города.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Наши преимущества</Text>
        <View style={styles.featureItem}>
          <Ionicons name="time" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Быстрая доставка за 30 минут</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="restaurant" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Более 200 ресторанов-партнеров</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="card" size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Удобные способы оплаты</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Контакты</Text>
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openLink('mailto:support@foodexpress.com')}
        >
          <Ionicons name="mail" size={20} color="#2196F3" />
          <Text style={styles.contactText}>support@TESTfoodexpress.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openLink('tel:+78005553535')}
        >
          <Ionicons name="call" size={20} color="#2196F3" />
          <Text style={styles.contactText}>8 (800) 88888888888</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.contactItem}
          onPress={() => openLink('https://foodexpress.com')}
        >
          <Ionicons name="globe" size={20} color="#2196F3" />
          <Text style={styles.contactText}>foodexpressTEST.com</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>© 2023 FoodExpress. Все права защищены.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop:50
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    color: '#777',
  },
  section: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2196F3',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialIcon: {
    padding: 10,
  },
  copyright: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
});

export default about;