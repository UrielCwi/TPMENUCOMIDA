import React, { createContext, useState, useEffect, useContext } from 'react';
const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const initialMenus = JSON.parse(localStorage.getItem('menus')) || {
    carneAsada: [],
    polloYPescado: [],
    ensalada: [],
    carneVeganaYEnsalada: [],
  };

  const [menus, setMenus] = useState(initialMenus);
  const saveMenusToLocalStorage = (menus) => {
    localStorage.setItem('menus', JSON.stringify(menus));
  };

  const addProductToMenu = (menuType, product) => {
    const updatedMenus = {
      ...menus,
      [menuType]: [...menus[menuType], product],
    };
    setMenus(updatedMenus);
    saveMenusToLocalStorage(updatedMenus);
  };

  const removeProductFromMenu = (menuType, productId) => {
    const updatedMenus = {
      ...menus,
      [menuType]: menus[menuType].filter((product) => product.id !== productId),
    };
    setMenus(updatedMenus);
    saveMenusToLocalStorage(updatedMenus);
  };

  useEffect(() => {
    const storedMenus = localStorage.getItem('menus');
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }
  }, []);

  return (
    <ProductContext.Provider value={{ menus, addProductToMenu, removeProductFromMenu }}>
      {children}
    </ProductContext.Provider>
  );
};
