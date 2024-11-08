import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useProducts } from '../context/productContext';

export default function DetallePlatoScreen({ route }) {
  const { menuId } = route.params;
  const { menus } = useProducts();
  const [menuDetails, setMenuDetails] = useState([]);

  useEffect(() => {
    let menuName = '';
    if (menus.carneAsada.some(product => product.id === menuId)) {
      menuName = 'carneAsada';
    } else if (menus.polloYPescado.some(product => product.id === menuId)) {
      menuName = 'polloYPescado';
    } else if (menus.ensalada.some(product => product.id === menuId)) {
      menuName = 'ensalada';
    } else if (menus.carneVeganaYEnsalada.some(product => product.id === menuId)) {
      menuName = 'carneVeganaYEnsalada';
    }

    const product = menus[menuName].find(product => product.id === menuId);
    if (product) {
      setMenuDetails(product);
    }
  }, [menuId, menus]);

  if (!menuDetails) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: menuDetails.image }} style={styles.image} />
      <Text style={styles.title}>{menuDetails.title}</Text>
      <Text style={styles.description}>{menuDetails.summary}</Text>
      <Text style={styles.instructions}>{menuDetails.instructions}</Text>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#555',
  },
});
