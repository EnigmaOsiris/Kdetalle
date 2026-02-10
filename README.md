# 🛍️ Plataforma de Ventas - Catálogo de Productos

Una aplicación web moderna para gestionar y mostrar un catálogo de productos con integración de WhatsApp para ventas. Desarrollada con React, Vite y Tailwind CSS.

## ✨ Características

- 📦 **Catálogo de productos** con vista de tarjetas responsive
- 🖼️ **Galería de imágenes** para cada producto
- 🎨 **Gestión de variantes** (tallas y colores)
- 💬 **Integración con WhatsApp** para compras directas
- 👨‍💼 **Panel de administración** para gestionar productos
- 💾 **Persistencia local** con LocalStorage
- 📱 **Diseño responsive** para todos los dispositivos
- 🚀 **Deploy en GitHub Pages**

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar número de WhatsApp**

Edita el archivo `src/config.js` y actualiza el número de WhatsApp:

```javascript
export const WHATSAPP_NUMBER = '5212345678900'; // Reemplaza con tu número
```

**Formato del número:**
- Código de país + número
- Sin espacios, guiones ni el símbolo +
- Ejemplo México: `521234567890`
- Ejemplo España: `34612345678`

3. **Configurar contraseña de admin (opcional)**

En el mismo archivo `src/config.js`:

```javascript
export const ADMIN_PASSWORD = 'admin123'; // Cambia por una contraseña segura
```

4. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📖 Uso

### Ver el Catálogo

1. Abre la aplicación en tu navegador
2. Navega por los productos disponibles
3. Haz clic en "Ver detalles" para ver información completa
4. Selecciona talla y color
5. Haz clic en "Comprar por WhatsApp" para contactar

### Panel de Administración

1. Navega a `/admin` o usa el enlace en el header
2. Ingresa la contraseña (configurada en `src/config.js`)
3. Gestiona productos:
   - ➕ **Agregar:** Click en "Agregar Producto"
   - ✏️ **Editar:** Click en "Editar" en la fila del producto
   - 🗑️ **Eliminar:** Click en "Eliminar" y confirma

### Agregar Imágenes de Productos

1. Coloca tus imágenes en la carpeta `public/productos/`
   - Ejemplo: `public/productos/camisa-azul-1.jpg`

2. En el formulario de producto, agrega la ruta relativa:
   - `productos/camisa-azul-1.jpg`

3. Puedes agregar múltiples imágenes para cada producto

**Recomendaciones para imágenes:**
- Formato: JPG o PNG
- Tamaño recomendado: 800x800px
- Peso máximo: 500KB por imagen
- Usa nombres descriptivos sin espacios

## 🏗️ Estructura del Proyecto

```
plataformaVentas/
├── public/
│   └── productos/          # Imágenes de productos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductForm.jsx
│   ├── pages/             # Páginas principales
│   │   ├── Catalog.jsx
│   │   └── Admin.jsx
│   ├── hooks/             # Custom hooks
│   │   └── useProducts.js
│   ├── utils/             # Utilidades
│   │   ├── storage.js
│   │   └── whatsapp.js
│   ├── config.js          # Configuración
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🌐 Deploy en GitHub Pages

### Configuración Inicial

1. **Actualizar base path en `vite.config.js`**

Si tu repositorio no se llama "plataformaVentas", actualiza el `base`:

```javascript
export default defineConfig({
  base: '/tu-nombre-repositorio/',
  plugins: [react()],
})
```

### Proceso de Deploy

1. **Crear repositorio en GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/plataformaVentas.git
git push -u origin main
```

2. **Compilar y desplegar**

```bash
npm run build
npm run deploy
```

3. **Configurar GitHub Pages**

- Ve a tu repositorio en GitHub
- Settings → Pages
- Source: "gh-pages" branch
- Guarda los cambios

Tu sitio estará disponible en: `https://tu-usuario.github.io/plataformaVentas/`

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Preview de la build
- `npm run deploy` - Despliega a GitHub Pages

## 💾 Gestión de Datos

Los productos se almacenan en **LocalStorage** del navegador. Esto significa:

✅ **Ventajas:**
- No requiere backend ni base de datos
- Cambios instantáneos
- Funciona offline
- Completamente gratis

⚠️ **Limitaciones:**
- Los datos son locales a cada navegador
- Límite de ~5-10MB de almacenamiento
- Se pierden si se limpia el caché del navegador

### Backup de Productos

Para respaldar tus productos:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Application" → "Local Storage"
3. Busca la clave `plataforma_ventas_productos`
4. Copia el valor JSON a un archivo

Para restaurar:
1. Pega el JSON en la consola:
```javascript
localStorage.setItem('plataforma_ventas_productos', 'TU_JSON_AQUI');
```

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar el esquema de colores:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#tu-color',
      whatsapp: '#25D366',
    },
  },
}
```

### Nombre de la Tienda

Edita `src/components/Header.jsx`:

```jsx
<span className="text-xl font-bold text-gray-900">
  Tu Nombre de Tienda
</span>
```

### Productos Iniciales

Edita `src/utils/storage.js` para cambiar los productos de ejemplo:

```javascript
const PRODUCTOS_INICIALES = [
  {
    nombre: 'Tu Producto',
    precio: 299,
    // ...
  }
];
```

## 📱 Responsive Design

La aplicación es completamente responsive:

- 📱 **Móvil:** 1 columna
- 📱 **Tablet:** 2 columnas
- 💻 **Desktop:** 3-4 columnas

## 🔒 Seguridad

**Nota importante:** El sistema de autenticación del panel de administración es básico y está pensado para uso personal.

Para producción con datos sensibles, considera:
- Implementar backend con autenticación real
- Usar variables de entorno para credenciales
- Implementar HTTPS
- Agregar validación del lado del servidor

## 🐛 Solución de Problemas

### Las imágenes no se muestran

- Verifica que la ruta sea correcta: `productos/nombre-imagen.jpg`
- Asegúrate de que la imagen exista en `public/productos/`
- Revisa que el nombre no tenga espacios ni caracteres especiales

### Los productos no persisten

- Verifica que LocalStorage no esté deshabilitado
- Revisa la consola del navegador para errores
- Intenta en modo normal (no incógnito)

### Error al hacer deploy

- Verifica que el `base` en `vite.config.js` coincida con el nombre del repositorio
- Asegúrate de tener `gh-pages` instalado: `npm install -D gh-pages`
- Revisa que el repositorio exista en GitHub

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Si tienes preguntas o problemas, abre un issue en el repositorio de GitHub.

---

Hecho con ❤️ usando React + Vite + Tailwind CSS
