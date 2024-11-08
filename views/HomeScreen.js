import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const menus = [
    {
      id: 1,
      nombre: 'Carne Asada',
      tipo: 'Omnívoro',
      descripcion: 'Deliciosa carne asada acompañada de papas y ensalada.',
    },
    {
      id: 2,
      nombre: 'Pollo y Pescado',
      tipo: 'Omnívoro',
      descripcion: 'Combinación de pollo asado y filete de pescado al vapor.',
    },
    {
      id: 3,
      nombre: 'Ensalada Vegana',
      tipo: 'Vegano',
      descripcion: 'Ensalada fresca con aguacate, tomate, zanahoria y lechuga.',
    },
    {
      id: 4,
      nombre: 'Carne Artificial y Ensalada',
      tipo: 'Vegano',
      descripcion: 'Carne vegetal a la parrilla acompañada de una ensalada mixta.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App de Platos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.menuContainer}>
          {menus.map((menu, index) => (
            <View style={styles.menuItem} key={index}>
              <Text style={styles.menuTitle}>{menu.nombre}</Text>
              <Text style={styles.menuDescription}>{menu.descripcion}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('detallePlato', { menuId: menu.id })}
                >
                  <Text style={styles.buttonText}>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Modificar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Button
        title="Buscar Platos"
        onPress={() => navigation.navigate('busquedaPlatos')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7', // Fondo gris claro
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuItem: {
    width: '48%', // Ocupa el 48% del ancho de la pantalla para dos items por fila
    backgroundColor: '#fff', // Fondo blanco
    padding: 16,
    marginBottom: 20,
    borderRadius: 12, // Borde redondeado para efecto de carta
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Sombra para Android
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  menuDescription: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555', // Texto ligeramente más oscuro
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Asegura que los botones tengan espacio
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8, // Reduce la altura del botón
    paddingHorizontal: 12, // Ajuste horizontal
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    flex: 1, // Hace que los botones se distribuyan por igual
    maxWidth: '45%', // No ocupen más del 45% del espacio en una fila
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center', // Asegura que el texto esté centrado en el botón
  },
});
