import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Usamos Link para navegación

const platos = [
  { id: '1', nombre: 'Plato 1' },
  { id: '2', nombre: 'Plato 2' },
  { id: '3', nombre: 'Plato 3' },
];

export default function BusquedaPlatosScreen() {
  const [search, setSearch] = useState('');
  const [filteredPlatos, setFilteredPlatos] = useState(platos);

  const handleSearch = () => {
    setFilteredPlatos(
      platos.filter(plato => plato.nombre.toLowerCase().includes(search.toLowerCase()))
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar plato..."
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />
      
      <FlatList
        data={filteredPlatos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Link href={`/detallePlato/${item.id}`}>
              <Button title="Ver detalles" />
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
