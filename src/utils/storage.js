// Funciones para gestionar productos en LocalStorage

const STORAGE_KEY = 'plataforma_ventas_productos';

// Productos de ejemplo iniciales
const PRODUCTOS_INICIALES = [
  {
    id: '1',
    nombre: 'Camiseta Básica',
    precio: 299,
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Blanco', 'Negro', 'Azul'],
    descripcion: 'Camiseta de algodón 100% de alta calidad. Perfecta para uso diario.',
    imagenes: ['productos/ejemplo1.jpg'],
    createdAt: Date.now()
  },
  {
    id: '2',
    nombre: 'Pantalón de Mezclilla',
    precio: 599,
    tallas: ['28', '30', '32', '34', '36'],
    colores: ['Azul claro', 'Azul oscuro', 'Negro'],
    descripcion: 'Pantalón de mezclilla con corte moderno y cómodo. Tela duradera y resistente.',
    imagenes: ['productos/ejemplo2.jpg'],
    createdAt: Date.now()
  },
  {
    id: '3',
    nombre: 'Sudadera con Capucha',
    precio: 499,
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    colores: ['Gris', 'Negro', 'Azul marino'],
    descripcion: 'Sudadera cómoda con capucha y bolsillo frontal. Ideal para clima frío.',
    imagenes: ['productos/ejemplo3.jpg'],
    createdAt: Date.now()
  }
];

// Obtener todos los productos
export const getProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Si no hay productos, cargar los iniciales
    saveProducts(PRODUCTOS_INICIALES);
    return PRODUCTOS_INICIALES;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Guardar array completo de productos
export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error al guardar productos:', error);
    return false;
  }
};

// Agregar un nuevo producto
export const addProduct = (product) => {
  try {
    const products = getProducts();
    const newProduct = {
      ...product,
      id: generateId(),
      createdAt: Date.now()
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    return null;
  }
};

// Actualizar un producto existente
export const updateProduct = (id, updatedProduct) => {
  try {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedProduct,
        id, // Mantener el ID original
      };
      saveProducts(products);
      return products[index];
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return null;
  }
};

// Eliminar un producto
export const deleteProduct = (id) => {
  try {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return false;
  }
};

// Generar ID único
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
