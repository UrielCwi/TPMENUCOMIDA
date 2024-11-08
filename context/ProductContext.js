import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const menuIds = {
  carneAsada: [649195, 635675, 660275, 636026],
  polloYPescado: [638550, 632815, 1697751, 654403],
  ensalada: [660109, 651467, 634792, 37513],
  carneVeganaYEnsalada: [657243, 642540, 652750, 634792],
};

export const ProductProvider = ({ children }) => {
  const [menus, setMenus] = useState({
    carneAsada: [],
    polloYPescado: [],
    ensalada: [],
    carneVeganaYEnsalada: [],
  });

  // Función para obtener detalles de cada plato
  const fetchMenuDetails = async (menuKey) => {
    const menuIdsList = menuIds[menuKey];
    try {
      const productPromises = menuIdsList.map((id) =>
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=a58d09209c304872a01a3556e2f0c6c9`)
      );
      const results = await Promise.all(productPromises);
      setMenus((prevMenus) => ({
        ...prevMenus,
        [menuKey]: results.map((result) => result.data),
      }));
    } catch (error) {
      console.error('Error al obtener los detalles del menú:', error);
    }
  };

  useEffect(() => {
    Object.keys(menuIds).forEach((menuKey) => fetchMenuDetails(menuKey));
  }, []);

  return (
    <ProductContext.Provider value={{ menus }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => React.useContext(ProductContext);
