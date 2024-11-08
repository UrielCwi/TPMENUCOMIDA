import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [menus, setMenus] = useState({
    carneAsada: [],
    polloYPescado: [],
    ensalada: [],
    carneVeganaYEnsalada: [],
  });

  const menuIds = {
    carneAsada: [649195, 635675, 660275, 636026],
    polloYPescado: [638550, 632815, 1697751, 654403],
    ensalada: [660109, 651467, 634792, 37513],
    carneVeganaYEnsalada: [657243, 642540, 652750, 634792],
  };

  const fetchProductDetails = async (menuName, ids) => {
    try {
      const promises = ids.map((id) =>
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`)
      );
      const results = await Promise.all(promises);
      setMenus((prevMenus) => ({
        ...prevMenus,
        [menuName]: results.map((result) => result.data),
      }));
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  useEffect(() => {
    Object.keys(menuIds).forEach((menuName) => {
      fetchProductDetails(menuName, menuIds[menuName]);
    });
  }, []);

  const updateMenuProduct = (menuName, productId, updatedProduct) => {
    setMenus((prevMenus) => {
      const updatedMenu = prevMenus[menuName].map((product) =>
        product.id === productId ? updatedProduct : product
      );
      return { ...prevMenus, [menuName]: updatedMenu };
    });
  };

  return (
    <ProductContext.Provider value={{ menus, updateMenuProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
