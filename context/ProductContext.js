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
  const APIKey = '547d26b8e4054beeb2c8ad8a3f7b5f31';

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
        calculateMenuStats(parsedMenu, APIKey);
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
    console.log(menu.vegan)
    if (product.vegan) {
      if (menu.vegan.includes(product.id)) {
        alert('Este plato vegano ya está en el menú.');
        return;
      }
      if (menu.vegan.length >= 2) {
        alert('Solo puedes tener 2 platos veganos en el menú.');
        return;
      }
      const updatedMenu = { ...menu, vegan: [...menu.vegan, product.id] };
      setMenu(updatedMenu);
      calculateMenuStats(updatedMenu, APIKey);
      saveMenuToAsyncStorage(updatedMenu);
    } else {
      if (menu.nonVegan.includes(product.id)) {
        alert('Este plato no vegano ya está en el menú.');
        return;
      }
      if (menu.nonVegan.length >= 2) {
        alert('Solo puedes tener 2 platos no veganos en el menú.');
        return;
      }
      const updatedMenu = { ...menu, nonVegan: [...menu.nonVegan, product.id] };
      setMenu(updatedMenu);
      calculateMenuStats(updatedMenu, APIKey);
      saveMenuToAsyncStorage(updatedMenu);
    }
  };

  const removeProductFromMenu = (productId, isVegan) => {
    const updatedMenu = {
      vegan: isVegan ? menu.vegan.filter((id) => id !== productId) : menu.vegan,
      nonVegan: !isVegan ? menu.nonVegan.filter((id) => id !== productId) : menu.nonVegan,
    };
    setMenu(updatedMenu);
    calculateMenuStats(updatedMenu, APIKey);
    saveMenuToAsyncStorage(updatedMenu);
  };

  const calculateMenuStats = async (menu, APIKey) => {
    const allDishes = [
      ...menu.vegan.map((id) => ({ id, type: 'vegan' })),
      ...menu.nonVegan.map((id) => ({ id, type: 'nonVegan' })),
    ];
    try {
      const dishDetails = await Promise.all(
        allDishes.map(async (dish) => {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${dish.id}/information?apiKey=${APIKey}`
          );
          return {
            id: dish.id,
            title: response.data.title,
            image: response.data.image,
            price: response.data.pricePerServing / 100,
            healthScore: response.data.healthScore,
          };
        })
      );
  
      console.log("Detalles de los platos:", dishDetails);
        const total = dishDetails.reduce((sum, dish) => {
        console.log(`Dish ID: ${dish.id}, Title: ${dish.title}, Price: ${dish.price}`);
        return sum + (dish.price || 0);
      }, 0);
  
      console.log("Total acumulado:", total);
        const healthScoreAvg = dishDetails.length
        ? dishDetails.reduce((sum, dish) => {
            console.log(`Dish ID: ${dish.id}, Title: ${dish.title}, HealthScore: ${dish.healthScore}`);
            return sum + (dish.healthScore || 0);
          }, 0) / dishDetails.length
        : 0;
  
      console.log("Promedio de HealthScore:", healthScoreAvg);
      setTotalPrice(total);
      setAverageHealthScore(healthScoreAvg);
  
    } catch (error) {
      console.error('Error al obtener detalles del menú:', error);
    }
  };

  useEffect(() => {
    loadMenuFromAsyncStorage();
    console.log(menu.vegan)
    console.log(menu.nonVegan)
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
