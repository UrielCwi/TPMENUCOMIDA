import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';
import axios from 'axios';

export default function HomeScreen() {
  const { menus, removeProductFromMenu } = useProducts();
  const [productDetails, setProductDetails] = useState({});
  const navigation = useNavigation();
  console.log(menus)
  // Función para obtener los detalles de un plato desde la API de Spoonacular
  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${productId}/information?apiKey=3a5e6b926e0f4313b4a79dc8ee06be5f`)
      return {
        title: response.data.title,
        image: response.data.image,
      };
    } catch (error) {
      console.error('Error al obtener los detalles del plato:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      let details = {};
      for (const menuKey in menus) {
        for (const product of menus[menuKey]) {
          const detailsForProduct = await getProductDetails(product.id);
          details[product.id] = detailsForProduct;
        }
      }
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [menus]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.menuWrapper}>
        {Object.keys(menus).map((menuKey) => (
          <View key={menuKey} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Menu: {menuKey}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {menus[menuKey].length > 0 ? (
                menus[menuKey].map((product) => (
                  <View key={product.id} style={styles.menuCard}>
                    <Image
                      source={{ uri: productDetails[product.id]?.image || product.image }}
                      style={styles.menuImage}
                    />
                    <Text style={styles.menuTitle}>{productDetails[product.id]?.title || product.title}</Text>
                    <Button
                      title="Eliminar"
                      onPress={() => removeProductFromMenu(menuKey, product.id)}
                      color="#dc3545"
                    />
                    <Button
                      title="Ver Detalle"
                      onPress={() => navigation.navigate('detallePlato', { menuId: product.id })}
                      color="#007bff"
                    />
                  </View>
                ))
              ) : (
                <Text>No hay productos disponibles</Text>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('busquedaPlato', { menuKey })}
            >
              <Text style={styles.addButtonText}>Añadir Plato</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    flexWrap: 'wrap',
  },
  menuSection: {
    marginRight: 20,
    marginBottom: 20,
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
    marginBottom: 5,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
