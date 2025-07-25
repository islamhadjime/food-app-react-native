import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Notification {
  id: string;
  type: 'new_product' | 'promotion' | 'system';
  title: string;
  message: string;
  image?: string;
  date: Date;
  read: boolean;
  productId?: string;
}

const notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Загрузка уведомлений (замените на ваше реальное API)
  const loadNotifications = async () => {
    setRefreshing(true);
    try {
      // Имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData: Notification[] = [
        {
          id: '1',
          type: 'new_product',
          title: 'Новый товар',
          message: 'Стейк Рибай',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
          date: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
          read: false,
          productId: '123'
        },
      ];
      
      setNotifications(mockData);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <Animated.View 
      style={[
        styles.notificationCard,
        { opacity: item.read ? 0.8 : 1 },
        { transform: [{ scale: fadeAnim }] }
      ]}
    >
      <TouchableOpacity 
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.notificationHeader}>
          {item.type === 'new_product' && (
            <Ionicons name="pricetag" size={20} color="#4CAF50" />
          )}
          {item.type === 'promotion' && (
            <Ionicons name="megaphone" size={20} color="#FF9800" />
          )}
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadMarker} />}
        </View>
        
        <View style={styles.notificationBody}>
          {item.image && (
            <Image 
              source={{ uri: item.image }} 
              style={styles.notificationImage}
              resizeMode="contain"
            />
          )}
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        
        <Text style={styles.notificationDate}>
          {formatDate(item.date)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60 * 1000) return 'Только что';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))} мин назад`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} ч назад`;
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadNotifications}
            colors={['#FF6B6B']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Нет уведомлений</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  listContent: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  unreadMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginLeft: 'auto',
  },
  notificationBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  notificationMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});

export default notification;