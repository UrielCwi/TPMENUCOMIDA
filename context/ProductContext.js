import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const initialMenu = { vegan: [], nonVegan: [] };
  const [menu, setMenu] = useState(initialMenu);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);
  const APIKey = 'f105a26a7761456d8069c871199d1ad6'; // Reemplaza con tu API key

  const saveMenuToAsyncStorage = async (menu) => {
    try {
      await AsyncStorage.setItem('menu', JSON.stringify(menu));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  const loadMenuFromAsyncStorage = async () => {
    try {
      const storedMenu = await AsyncStorage.getItem('menu');
      if (storedMenu) {
        const parsedMenu = JSON.parse(storedMenu);
        setMenu(parsedMenu);
        calculateMenuStats(parsedMenu);
      }
    } catch (error) {
      console.error('Error al cargar desde AsyncStorage:', error);
    }
  };

  const fetchPrice = async (id) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json?apiKey=${APIKey}`
      );
      return response.data.totalCost / 100;
    } catch (error) {
      console.error('Error al obtener el precio:', error);
      return 0;
    }
  };

  const addProductToMenu = async (product) => {
    const price = await fetchPrice(product.id);

    if (product.vegan) {
      if (menu.vegan.length >= 2) {
        alert('Solo puedes tener 2 platos veganos en el menú.');
        return;
      }
      const updatedMenu = { ...menu, vegan: [...menu.vegan, { ...product, price }] };
      setMenu(updatedMenu);
      calculateMenuStats(updatedMenu);
      saveMenuToAsyncStorage(updatedMenu);
    } else {
      if (menu.nonVegan.length >= 2) {
        alert('Solo puedes tener 2 platos no veganos en el menú.');
        return;
      }
      const updatedMenu = { ...menu, nonVegan: [...menu.nonVegan, { ...product, price }] };
      setMenu(updatedMenu);
      calculateMenuStats(updatedMenu);
      saveMenuToAsyncStorage(updatedMenu);
    }
  };

  const removeProductFromMenu = (productId) => {
    const updatedMenu = {
      vegan: menu.vegan.filter((product) => product.id !== productId),
      nonVegan: menu.nonVegan.filter((product) => product.id !== productId),
    };
    setMenu(updatedMenu);
    calculateMenuStats(updatedMenu);
    saveMenuToAsyncStorage(updatedMenu);
  };

  const calculateMenuStats = (menu) => {
    const allDishes = [...menu.vegan, ...menu.nonVegan];
    const total = allDishes.reduce((sum, dish) => sum + dish.price, 0);
    const healthScoreAvg = allDishes.length
      ? allDishes.reduce((sum, dish) => sum + dish.healthScore, 0) / allDishes.length
      : 0;
    setTotalPrice(total);
    setAverageHealthScore(healthScoreAvg);
  };

  useEffect(() => {
    loadMenuFromAsyncStorage();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        menu,
        totalPrice,
        averageHealthScore,
        APIKey,
        addProductToMenu,
        removeProductFromMenu,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
