import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const initialMenus = {
    carneAsada: [],
    polloYPescado: [],
    ensalada: [],
    carneVeganaYEnsalada: [],
  };

  const [menus, setMenus] = useState(initialMenus);

  const saveMenusToAsyncStorage = async (menus) => {
    try {
      await AsyncStorage.setItem('menus', JSON.stringify(menus));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  };

  const addProductToMenu = (menuType, product) => {
    const updatedMenus = {
      ...menus,
      [menuType]: [...menus[menuType], product],
    };
    setMenus(updatedMenus);
    saveMenusToAsyncStorage(updatedMenus);
  };

  const removeProductFromMenu = (menuType, productId) => {
    const updatedMenus = {
      ...menus,
      [menuType]: menus[menuType].filter((product) => product.id !== productId),
    };
    setMenus(updatedMenus);
    saveMenusToAsyncStorage(updatedMenus);
  };

  useEffect(() => {
    const loadMenusFromAsyncStorage = async () => {
      try {
        const storedMenus = await AsyncStorage.getItem('menus');
        if (storedMenus) {
          setMenus(JSON.parse(storedMenus));
        }
      } catch (error) {
        console.error('Error al cargar desde AsyncStorage:', error);
      }
    };

    loadMenusFromAsyncStorage();
  }, []);

  return (
    <ProductContext.Provider value={{ menus, addProductToMenu, removeProductFromMenu }}>
      {children}
    </ProductContext.Provider>
  );
};
