import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/productContext';

export default function HomeScreen() {
  const { menus } = useProducts();
  const navigation = useNavigation();

  const navigateToDetails = (menuId) => {
    navigation.navigate('detallePlato', { menuId });
  };

  return (
    <ScrollView horizontal style={styles.container}>
      <View style={styles.menuWrapper}>
        {/* Menú Carne Asada */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Carne Asada</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>

        {/* Menú Pollo y Pescado */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Pollo y Pescado</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>

        {/* Menú Ensalada */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Ensalada</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>

        {/* Menú Carne Vegana y Ensalada */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menú Carne Vegana y Ensalada</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  menuSection: {
    marginRight: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  menuCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 3,
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
