const DICTIONARY = [
  {
    words: [
      "Costo",
      "Valor",
      "Tarifa",
      "Precio",
      "Importe",
      "Tasa",
      "Monto",
      "Cantidad",
      "Cuantía",
      "Tasación",
      "Coste",
      "Estimación",
      "Desembolso",
      "Contraprestación",
      "Cifra",
      "Costoso",
      "Valoración",
      "Tasación",
    ],
    response: `Este es nuestro listado de precios: 
    - Poción de vida: 200 gemas,
    - Poción de maná: 150 gemas,
    - Poción de invisibilidad: 300 gemas,
    - Poción de fuerza: 400 gemas,
    - Poción de velocidad: 500 gemas,
    - Poción de resistencia: 600 gemas,
    `,
  },
  {
    words: [
      "Artículo",
      "Mercancía",
      "Artículo",
      "Ítem",
      "Creación",
      "Manufactura",
      "Resultado",
      "Elaboración",
      "Producción",
      "Artículo",
      "Obra",
      "Elemento",
      "Producto",
    ],
    response: `Tenemos los siguientes artículos en venta: 
    Poción de vida, 
    Poción de maná, 
    Poción de invisibilidad, 
    Poción de fuerza, 
    Poción de velocidad, 
    Poción de resistencia,
    `,
  },

  {
    words: [
      "Residencia",
      "Hogar",
      "Morada",
      "Vivienda",
      "Casa",
      "Dirección",
      "Direccion",
      "Domicilio",
      "ubicado",
      "ubicacion",
      "Domiciliación",
      "Alojamiento",
      "Habitación",
      "Apartamento",
      "Lugar de residencia",
      "Domitorio",
      "Lugar",
      "Estancia",
      "Rincón",
    ],
    response: `Nuestra dirección es: 
    Calle 123, Ciudad Gótica, 12345
    `,
  },
];

const generateResponse = (message) => {
  const item = DICTIONARY.find((x) =>
    x.words.some((word) => message.toLowerCase().includes(word.toLowerCase()))
  );

  if (!item) {
    return "Lo siento, no te he entendido";
  }

  return item.response;
};

module.exports = {
  generateResponse,
};
