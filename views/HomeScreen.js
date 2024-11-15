import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';
import axios from 'axios';

export default function HomeScreen() {
  const { menu, totalPrice, averageHealthScore, removeProductFromMenu } = useProducts();
  const navigation = useNavigation();
  const [menuDetails, setMenuDetails] = useState([]);

  const {APIKey} = useProducts();  
  const fetchMenuDetails = async () => {
    try {
      const details = await Promise.all(
        [...menu.vegan, ...menu.nonVegan].map(async (id) => {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKey}`
          );
          return {
            id: id,
            title: response.data.title,
            isVegan: response.data.vegan,
            image: response.data.image,
            price: response.data.pricePerServing / 100,
            healthScore: response.data.healthScore,
          };
        })
      );
      setMenuDetails(details);
    } catch (error) {
      console.error('Error al obtener detalles del menú:', error);
    }
  };

  useEffect(() => {
    fetchMenuDetails();
  }, [menu]);

  const renderMenuItem = (item) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Text style={styles.menuPrice}>
        ${item.price ? item.price.toFixed(2) + " || " : '0.00 ||  '}
      </Text>
      <Text style={styles.menuHealthScore}>HealthScore: {item.healthScore}</Text>
      <Button title="Eliminar" onPress={() => removeProductFromMenu(item.id, item.isVegan)} color="#dc3545" />
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
        data={menuDetails}
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
    flexDirection: 'column', // Cambié de 'row' a 'column' para que los elementos estén en una columna
    alignItems: 'flex-start', // Alineación a la izquierda
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
    marginBottom: 10, // Añadí espacio entre la imagen y el texto
  },
  menuTitle: {
    fontSize: 16,
    marginBottom: 5, // Añadí espacio entre el título y los botones
  },
  menuPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5, // Añadí espacio entre el precio y los botones
  },
  menuHealthScore: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10, // Añadí espacio entre el health score y los botones
  },
  buttonsContainer: {
    flexDirection: 'column', // Coloca los botones en una columna
    alignItems: 'center', // Centra los botones
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5, // Espacio entre los botones
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
