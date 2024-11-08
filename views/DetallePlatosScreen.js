import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router'; // Para obtener los parámetros de la ruta

export default function DetallePlatoScreen() {
  const { platoId } = useSearchParams(); // Obtener el platoId de la ruta

  // Aquí puedes hacer una llamada a la API para obtener los detalles del plato
  const plato = { id: platoId, nombre: `Plato ${platoId}`, descripcion: `Descripción del Plato ${platoId}` };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.nombre}</Text>
      <Text>{plato.descripcion}</Text>
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});
