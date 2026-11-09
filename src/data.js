export const SHIPPING = 35;

export const categories = [
  {
    id: "enchiladas",
    name: "Enchiladas",
    blurb: "Bañadas en salsas tradicionales de la casa, con crema de rancho y queso añejo.",
    extras: ["Salsa Verde", "Salsa Roja", "Mineras", "Suizas"],
    items: [
      {
        id: "enc-verdes",
        name: "Enchiladas Verdes",
        category: "Enchiladas",
        price: 110,
        desc: "Rellenas de pollo deshebrado, bañadas en salsa verde de tomatillo con toque de serrano.",
        tags: ["Clásicas", "Picor medio"],
        image: "/ev.jpg"
      },
      {
        id: "enc-rojas",
        name: "Enchiladas Rojas",
        category: "Enchiladas",
        price: 110,
        desc: "Tortilla pasada por salsa de chile guajillo, rellenas de queso fresco.",
        tags: ["Tradicionales"],
        image: "/er.webp"
      },
      {
        id: "enc-mineras",
        name: "Enchiladas Mineras",
        category: "Enchiladas",
        price: 125,
        desc: "Estilo Guanajuato, rellenas de papa con zanahoria, acompañadas de pieza de pollo.",
        tags: ["Especialidad de la casa"],
        image: "/em.webp"
      },
      {
        id: "enc-suizas",
        name: "Enchiladas Suizas",
        category: "Enchiladas",
        price: 130,
        desc: "Gratinadas con queso Manchego fundido sobre salsa cremosa verde.",
        tags: ["Gratinadas"],
        image: "/es.webp"
      }
    ]
  },
  {
    id: "tacos",
    name: "Tacos Artesanales",
    blurb: "Tortilla hecha a mano al momento del pedido. Órdenes de 5 piezas.",
    extras: ["Pastor", "Birria", "Suadero", "Carnitas", "Bistec"],
    items: [
      {
        id: "tac-pastor",
        name: "Tacos al Pastor",
        category: "Tacos",
        price: 95,
        desc: "El clásico de la casa marinado en achiote y especias, con piña asada.",
        tags: ["Favorito"],
        image: "/tcp.webp"
      },
      {
        id: "tac-birria",
        name: "Tacos de Birria",
        category: "Tacos",
        price: 105,
        desc: "Carne de res estofada lentamente, doraditos con suadero y su consomé para chochear.",
        tags: ["Con consomé"],
        image: "/tb.webp"
      },
      {
        id: "tac-suadero",
        name: "Tacos de Suadero",
        category: "Tacos",
        price: 95,
        desc: "Confitado en su propio jugo, suave y jugoso, picado fino con cilantro y cebolla.",
        tags: ["Tradicional"],
        image: "/ts.jpeg"
      },
      {
        id: "tac-carnitas",
        name: "Tacos de Carnitas",
        category: "Tacos",
        price: 95,
        desc: "Estilo Michoacán, surtido o maciza, con un toque de salsa borracha.",
        tags: ["Artesanales"],
        image: "/tc.webp"
      },
      {
        id: "tac-bistec-q",
        name: "Bistec con Queso",
        category: "Tacos",
        price: 115,
        desc: "Costra de queso asadero con jugoso bistec de res al carbón.",
        tags: ["Con costra"],
        image: "/tbc.webp"
      },
      {
        id: "tac-pollo",
        name: "Tacos de Pollo al Carbón",
        category: "Tacos",
        price: 90,
        desc: "Pechuga marinada a las brasas con adobo secreto de la abuela.",
        tags: ["Ligeros"],
        image: "/tp.webp"
      }
    ]
  }
];

export const allItems = categories.reduce((acc, cat) => {
  cat.items.forEach((item) => {
    acc[item.id] = item;
  });
  return acc;
}, {});

export const money = (n) => `$${n.toFixed(2)} MXN`;