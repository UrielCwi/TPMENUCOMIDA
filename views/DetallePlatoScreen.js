import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';

export default function DetallePlatoScreen() {
  const route = useRoute();
  const { menuId } = route.params;
  const [dishDetails, setDishDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {APIKey} = useProducts();

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${menuId}/information?apiKey=${APIKey}`
        );
        setDishDetails(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del plato:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [menuId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  if (!dishDetails) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar los detalles del plato.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: dishDetails.image }} style={styles.image} />
      <Text style={styles.title}>{dishDetails.title}</Text>
      <Text style={styles.details}>HealthScore: {dishDetails.healthScore}</Text>
      <Text style={styles.details}>{dishDetails.vegan ? 'Vegano' : 'No Vegano'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});