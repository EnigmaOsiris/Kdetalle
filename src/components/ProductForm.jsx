import { useState, useEffect } from 'react';

/**
 * Formulario para agregar o editar productos
 */
const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    tallas: [],
    colores: [],
    imagenes: []
  });

  const [tallaInput, setTallaInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [errors, setErrors] = useState({});

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        precio: product.precio || '',
        descripcion: product.descripcion || '',
        tallas: product.tallas || [],
        colores: product.colores || [],
        imagenes: product.imagenes || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al editar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTalla = () => {
    if (tallaInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tallas: [...prev.tallas, tallaInput.trim()]
      }));
      setTallaInput('');
    }
  };

  const handleRemoveTalla = (index) => {
    setFormData(prev => ({
      ...prev,
      tallas: prev.tallas.filter((_, i) => i !== index)
    }));
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        colores: [...prev.colores, colorInput.trim()]
      }));
      setColorInput('');
    }
  };

  const handleRemoveColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colores: prev.colores.filter((_, i) => i !== index)
    }));
  };

  const handleAddImagen = () => {
    if (imagenInput.trim()) {
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, imagenInput.trim()]
      }));
      setImagenInput('');
    }
  };

  const handleRemoveImagen = (index) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.precio || formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (formData.tallas.length === 0) {
      newErrors.tallas = 'Debe agregar al menos una talla';
    }

    if (formData.colores.length === 0) {
      newErrors.colores = 'Debe agregar al menos un color';
    }

    if (formData.imagenes.length === 0) {
      newErrors.imagenes = 'Debe agregar al menos una imagen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio)
    };

    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del producto *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`input-field ${errors.nombre ? 'border-red-500' : ''}`}
          placeholder="Ej: Camiseta Básica"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
        )}
      </div>

      {/* Precio */}
      <div>
        <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
          Precio *
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className={`input-field ${errors.precio ? 'border-red-500' : ''}`}
          placeholder="299"
          min="0"
          step="0.01"
        />
        {errors.precio && (
          <p className="mt-1 text-sm text-red-600">{errors.precio}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="input-field"
          rows="4"
          placeholder="Descripción detallada del producto..."
        />
      </div>

      {/* Tallas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tallas disponibles *
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tallaInput}
            onChange={(e) => setTallaInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTalla())}
            className="input-field"
            placeholder="Ej: S, M, L, XL"
          />
          <button
            type="button"
            onClick={handleAddTalla}
            className="btn-secondary whitespace-nowrap"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tallas.map((talla, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              {talla}
              <button
                type="button"
                onClick={() => handleRemoveTalla(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.tallas && (
          <p className="mt-1 text-sm text-red-600">{errors.tallas}</p>
        )}
      </div>

      {/* Colores */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Colores disponibles *
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
            className="input-field"
            placeholder="Ej: Rojo, Azul, Verde"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="btn-secondary whitespace-nowrap"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.colores.map((color, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full"
            >
              {color}
              <button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.colores && (
          <p className="mt-1 text-sm text-red-600">{errors.colores}</p>
        )}
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rutas de imágenes *
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Sube las imágenes a la carpeta <code className="bg-gray-100 px-1 rounded">public/productos/</code> y escribe la ruta
        </p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={imagenInput}
            onChange={(e) => setImagenInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImagen())}
            className="input-field"
            placeholder="productos/imagen.jpg"
          />
          <button
            type="button"
            onClick={handleAddImagen}
            className="btn-secondary whitespace-nowrap"
          >
            Agregar
          </button>
        </div>
        <div className="space-y-2">
          {formData.imagenes.map((imagen, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
            >
              <span className="flex-1 text-sm text-gray-700">{imagen}</span>
              <button
                type="button"
                onClick={() => handleRemoveImagen(index)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        {errors.imagenes && (
          <p className="mt-1 text-sm text-red-600">{errors.imagenes}</p>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex-1 btn-primary">
          {product ? 'Actualizar' : 'Guardar'} Producto
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn-secondary"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
