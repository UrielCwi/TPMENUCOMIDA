import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';
import axios from 'axios';

export default function HomeScreen() {
  const { menu, totalPrice, averageHealthScore, removeProductFromMenu } = useProducts();
  const navigation = useNavigation();

  const renderMenuItem = (item) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Text style={styles.menuPrice}>
        ${item.price ? item.price.toFixed(2) : '0.00'}
      </Text>
      <Text style={styles.menuHealthScore}>HealthScore: {item.healthScore}</Text>
      <Button title="Eliminar" onPress={() => removeProductFromMenu(item.id)} color="#dc3545" />
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('detallePlato', { menuId: item.id })}
      >
        <Text style={styles.detailsButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú</Text>
      <Text style={styles.stats}>Precio Total: ${totalPrice.toFixed(2)}</Text>
      <Text style={styles.stats}>HealthScore Promedio: {averageHealthScore.toFixed(2)}</Text>
      <FlatList
        data={[...menu.vegan, ...menu.nonVegan]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderMenuItem(item)}
      />
      <Button title="Buscar Plato" onPress={() => navigation.navigate('busquedaPlato')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  menuImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  menuTitle: {
    fontSize: 16,
    flex: 1,
  },
  menuPrice: {
    fontSize: 14,
    color: '#888',
  },
  menuHealthScore: {
    fontSize: 14,
    color: '#888',
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});