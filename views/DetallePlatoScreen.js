import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function DetallePlatoScreen() {
  const route = useRoute();
  const { menuId } = route.params; 
  const [menuDetails, setMenuDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${menuId}/information?apiKey=3a5e6b926e0f4313b4a79dc8ee06be5f`
        );
        setMenuDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del plato:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetails();
  }, [menuId]); // Se ejecuta cuando el ID cambia

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  if (!menuDetails) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron detalles del plato.</Text>
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
