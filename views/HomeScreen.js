import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/productContext';
import { Button } from 'react-native-web';

export default function HomeScreen() {
  const { menus } = useProducts();
  const navigation = useNavigation();

  const navigateToDetails = (menuId) => {
    navigation.navigate('detallePlato', { menuId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menús Disponibles</Text>

      <View style={styles.menuGrid}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Carne Asada</Text>
          <View style={styles.productsContainer}>
            {menus.carneAsada.length > 0 ? (
              menus.carneAsada.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.menuCard}
                  onPress={() => navigateToDetails(product.id)}
                >
                  <Image source={{ uri: product.image }} style={styles.menuImage} />
                  <Text style={styles.menuTitle}>{product.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay productos disponibles</Text>
            )}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Pollo y Pescado</Text>
          <View style={styles.productsContainer}>
            {menus.polloYPescado.length > 0 ? (
              menus.polloYPescado.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.menuCard}
                  onPress={() => navigateToDetails(product.id)}
                >
                  <Image source={{ uri: product.image }} style={styles.menuImage} />
                  <Text style={styles.menuTitle}>{product.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay productos disponibles</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.menuGrid}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Ensalada</Text>
          <View style={styles.productsContainer}>
            {menus.ensalada.length > 0 ? (
              menus.ensalada.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.menuCard}
                  onPress={() => navigateToDetails(product.id)}
                >
                  <Image source={{ uri: product.image }} style={styles.menuImage} />
                  <Text style={styles.menuTitle}>{product.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay productos disponibles</Text>
            )}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Carne Vegana y Ensalada</Text>
          <View style={styles.productsContainer}>
            {menus.carneVeganaYEnsalada.length > 0 ? (
              menus.carneVeganaYEnsalada.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.menuCard}
                  onPress={() => navigateToDetails(product.id)}
                >
                  <Image source={{ uri: product.image }} style={styles.menuImage} />
                  <Text style={styles.menuTitle}>{product.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No hay productos disponibles</Text>
            )}
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuSection: {
    width: '48%', // Dos menús por fila
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 3, // Agregar sombra
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%', // Dos productos por fila
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 3, // Sombra para los platos
  },
  menuImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
