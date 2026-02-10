import { useState, useEffect } from 'react';
import {
  getProducts as getProductsFromStorage,
  saveProducts as saveProductsToStorage,
  addProduct as addProductToStorage,
  updateProduct as updateProductInStorage,
  deleteProduct as deleteProductFromStorage
} from '../utils/storage';

/**
 * Custom hook para gestionar productos con sincronización a LocalStorage
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = () => {
      try {
        const loadedProducts = getProductsFromStorage();
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Agregar nuevo producto
  const addProduct = (productData) => {
    const newProduct = addProductToStorage(productData);
    if (newProduct) {
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    }
    return null;
  };

  // Actualizar producto existente
  const updateProduct = (id, productData) => {
    const updatedProduct = updateProductInStorage(id, productData);
    if (updatedProduct) {
      setProducts(prev =>
        prev.map(p => (p.id === id ? updatedProduct : p))
      );
      return updatedProduct;
    }
    return null;
  };

  // Eliminar producto
  const deleteProduct = (id) => {
    const success = deleteProductFromStorage(id);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    }
    return false;
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
