import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para la navegación
import { useProducts } from '../context/productContext'; // Importamos el contexto

export default function HomeScreen() {
  const { menus } = useProducts(); // Obtenemos los menús del contexto
  const navigation = useNavigation(); // Para la navegación hacia la pantalla de detalle del plato

  const navigateToDetails = (menuId) => {
    // Navegar a la pantalla de detalles pasando el ID del plato
    navigation.navigate('detallePlato', { menuId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Menús Disponibles</Text>

      {/* Carne Asada */}
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

      {/* Pollo y Pescado */}
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

      {/* Ensalada */}
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

      {/* Carne Vegana y Ensalada */}
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
    </ScrollView>
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
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuCard: {
    width: 200,
    height: 250,
    backgroundColor: '#f5f5f5',
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
  },
});
