// Utilidad para generar enlaces de WhatsApp

import { WHATSAPP_NUMBER } from '../config';

/**
 * Genera un enlace de WhatsApp con mensaje pre-rellenado
 * @param {Object} product - Producto seleccionado
 * @param {string} talla - Talla seleccionada
 * @param {string} color - Color seleccionado
 * @returns {string} URL de WhatsApp
 */
export const generateWhatsAppLink = (product, talla = '', color = '') => {
  // Construir el mensaje
  let mensaje = `Hola! Estoy interesado en: *${product.nombre}*`;

  if (talla) {
    mensaje += `\nTalla: ${talla}`;
  }

  if (color) {
    mensaje += `\nColor: ${color}`;
  }

  mensaje += `\nPrecio: $${product.precio}`;

  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Construir URL de WhatsApp
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;

  return url;
};

/**
 * Abre WhatsApp en una nueva ventana
 * @param {Object} product - Producto seleccionado
 * @param {string} talla - Talla seleccionada
 * @param {string} color - Color seleccionado
 */
export const openWhatsApp = (product, talla = '', color = '') => {
  const url = generateWhatsAppLink(product, talla, color);
  window.open(url, '_blank');
};
