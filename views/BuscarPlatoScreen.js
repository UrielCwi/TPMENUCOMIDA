import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';

export default function BuscarPlatoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const { addProductToMenu } = useProducts();
  const navigation = useNavigation();
  const { APIKey } = useProducts();

  const fetchSearchResults = async (query, offset = 0) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&offset=${offset}&apiKey=${APIKey}&addRecipeInformation=TRUE`
      );
      setSearchResults(response.data.results);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error al buscar platos:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentOffset(0); 
    if (text.length > 2) {
      fetchSearchResults(text, 0); 
    }
  };

  const handleAddDish = (dish) => {
    addProductToMenu(dish);
    navigation.goBack();
  };

  const handleNextPage = () => {
    const nextOffset = currentOffset + 5; 
    if (nextOffset < totalResults) {
      setCurrentOffset(nextOffset);
      fetchSearchResults(searchQuery, nextOffset);
    }
  };

  const handlePreviousPage = () => {
    const prevOffset = currentOffset - 5;
    if (prevOffset >= 0) {
      setCurrentOffset(prevOffset);
      fetchSearchResults(searchQuery, prevOffset);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar plato..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {searchResults.map((item) => (
          <View style={styles.resultItem} key={item.id}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.dishImage}
              />
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddDish({ ...item, vegan: item.vegan, price: item.price, healthScore: item.healthScore })}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigation.navigate('detallePlato', { menuId: item.id })}
            >
              <Text style={styles.addButtonText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePreviousPage} disabled={currentOffset <= 0}>
          <Text style={[styles.arrow, currentOffset <= 0 && styles.disabledArrow]}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPage} disabled={currentOffset + 5 >= totalResults}>
          <Text style={[styles.arrow, currentOffset + 5 >= totalResults && styles.disabledArrow]}>{'>'}</Text>
        </TouchableOpacity>
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
  dishImage: {
    width: '100%',
    height: 125,
    resizeMode: 'cover',
    marginBottom: 10, 
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultTitle: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: '#3c30ff',
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  arrow: {
    fontSize: 24,
    padding: 10,
  },
  disabledArrow: {
    color: '#ccc',
  },
});