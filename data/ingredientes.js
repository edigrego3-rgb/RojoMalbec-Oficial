// Datos de ingredientes exportados del diccionario BOTANICA
// Total: 60 ingredientes
const INGREDIENTES = [
  {
    "id": 1,
    "nombre": "Sal Marina Liberato Entrefina",
    "icono": "🧂",
    "imagen": "images/ingredientes/sal_marina_liberato_entrefina_1780586459161.png",
    "familia": "Mineral",
    "origen": "Salinas del Litoral Atlántico",
    "descripcion": "Cristales de sal marina obtenidos por evaporación solar. Rica en oligoelementos.",
    "perfiles": [
      "neutro"
    ],
    "categoria": "sales"
  },
  {
    "id": 2,
    "nombre": "Sumac",
    "icono": "🍇",
    "imagen": "images/ingredientes/sumac_1780586471272.png",
    "familia": "Anacardiaceae",
    "origen": "Levante Mediterráneo, Irán",
    "descripcion": "Bayas secas con sabor ácido-afrutado con notas de limón y frambuesa.",
    "perfiles": [
      "citrico",
      "acido"
    ],
    "categoria": "especias"
  },
  {
    "id": 3,
    "nombre": "Cardamomo",
    "icono": "💚",
    "imagen": "images/ingredientes/cardamomo_1780586486827.png",
    "familia": "Zingiberaceae",
    "origen": "Montes Ghats, India",
    "descripcion": "La 'Reina de las Especias'. Perfil eucaliptado, mentolado y cítrico.",
    "perfiles": [
      "citrico"
    ],
    "categoria": "especias"
  },
  {
    "id": 4,
    "nombre": "Cardamomo Negro",
    "icono": "💚",
    "familia": "Zingiberaceae",
    "origen": "Himalaya, Nepal",
    "descripcion": "Cápsulas ahumadas sobre fuego de madera. Perfil intensamente ahumado.",
    "perfiles": [
      "ahumado",
      "terroso"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/cardamomo_negro.png"
  },
  {
    "id": 5,
    "nombre": "Pimienta Larga",
    "icono": "⚫",
    "imagen": "images/ingredientes/pimienta_larga_1780586500343.png",
    "familia": "Piperaceae",
    "origen": "India, Indonesia",
    "descripcion": "Predecesora de la pimienta negra. Sabor picante-dulce, notas de canela.",
    "perfiles": [
      "picante",
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 6,
    "nombre": "Cúrcuma en Polvo",
    "icono": "🌟",
    "imagen": "images/ingredientes/curcuma_en_polvo_1780586513089.png",
    "familia": "Zingiberaceae",
    "origen": "Sur de Asia",
    "descripcion": "Rizoma dorado. Sabor terroso con notas de jengibre. Antiinflamatorio.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias"
  },
  {
    "id": 7,
    "nombre": "Coriandro",
    "icono": "🌱",
    "imagen": "images/ingredientes/coriandro_1780586525386.png",
    "familia": "Apiaceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Semillas con perfil cítrico-floral y notas de naranja.",
    "perfiles": [
      "floral",
      "citrico"
    ],
    "categoria": "especias"
  },
  {
    "id": 8,
    "nombre": "Comino en Grano",
    "icono": "🌰",
    "familia": "Apiaceae",
    "origen": "Levante, Egipto",
    "descripcion": "Semillas con aroma terroso-cálido. Esencial en cocina del Medio Oriente.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/comino_grano_1780522295978.png"
  },
  {
    "id": 9,
    "nombre": "Canela en Polvo",
    "icono": "🌱",
    "imagen": "images/ingredientes/canela_en_polvo_1780586537646.png",
    "familia": "Lauraceae",
    "origen": "Sri Lanka (Ceilán)",
    "descripcion": "Corteza del árbol de canela. Perfil dulce-especiado.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 10,
    "nombre": "Pétalos de Rosas",
    "icono": "🌹",
    "familia": "Rosaceae",
    "origen": "Bulgaria/Irán",
    "descripcion": "Pétalos de rosa de Damasco. Perfil floral intenso con notas de miel.",
    "perfiles": [
      "floral",
      "dulce"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/petalos_de_rosas.png"
  },
  {
    "id": 11,
    "nombre": "Romero",
    "icono": "🌿",
    "imagen": "images/ingredientes/romero_1780586550353.png",
    "familia": "Lamiaceae",
    "origen": "Cuenca Mediterránea",
    "descripcion": "Hojas con aroma alcanforado-resinoso. 'Rocío del mar'.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas"
  },
  {
    "id": 12,
    "nombre": "Tomillo",
    "icono": "🌿",
    "familia": "Lamiaceae",
    "origen": "Región Mediterránea",
    "descripcion": "Hojas con perfil herbáceo-terroso y notas de clavo.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/tomillo_1780522307702.png"
  },
  {
    "id": 13,
    "nombre": "Albahaca",
    "icono": "🌿",
    "familia": "Lamiaceae",
    "origen": "India, África tropical",
    "descripcion": "Hojas con perfil dulce-anisado. 'Hierba real' en griego.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/albahaca_1780586563147.png"
  },
  {
    "id": 14,
    "nombre": "Pimentón Español (Dulce)",
    "icono": "🔴",
    "imagen": "images/ingredientes/pimenton_espanol_dulce_1780586575323.png",
    "familia": "Solanaceae",
    "origen": "La Vera, Extremadura",
    "descripcion": "Pimientos secos con perfil dulce-ahumado. DOP La Vera.",
    "perfiles": [
      "ahumado",
      "dulce"
    ],
    "categoria": "ahumados"
  },
  {
    "id": 15,
    "nombre": "Ajo Granulado",
    "icono": "🧄",
    "imagen": "images/ingredientes/ajo_granulado_1780586599699.png",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Bulbo deshidratado. Perfil pungente-sulfuroso con notas dulces.",
    "perfiles": [
      "picante",
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 16,
    "nombre": "Jengibre en Polvo",
    "icono": "🫚",
    "imagen": "images/ingredientes/jengibre_en_polvo_1780586611179.png",
    "familia": "Zingiberaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Rizoma con perfil picante-cálido con notas cítricas.",
    "perfiles": [
      "citrico",
      "picante",
      "terroso"
    ],
    "categoria": "especias"
  },
  {
    "id": 17,
    "nombre": "Nuez Moscada",
    "icono": "🥜",
    "familia": "Myristicaceae",
    "origen": "Islas Banda, Indonesia",
    "descripcion": "Semilla con perfil cálido-dulce con notas de madera.",
    "perfiles": [
      "terroso",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/nuez_moscada_1780522319717.png"
  },
  {
    "id": 18,
    "nombre": "Fenogreco",
    "icono": "🌱",
    "familia": "Fabaceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Semillas con perfil de maple y curry.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/fenogreco_1780586624892.png"
  },
  {
    "id": 19,
    "nombre": "Azafrán en Polvo",
    "icono": "🧡",
    "familia": "Iridaceae",
    "origen": "Irán, Cachemira",
    "descripcion": "La especia más cara del mundo. Perfil floral-metálico con miel.",
    "perfiles": [
      "floral",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/azafran_polvo_1780522331488.png"
  },
  {
    "id": 20,
    "nombre": "Flor de Caléndula",
    "icono": "🌼",
    "familia": "Asteraceae",
    "origen": "Región Mediterránea",
    "descripcion": "Pétalos dorados. 'Oro de María'. Colorante natural.",
    "perfiles": [
      "floral"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/flor_calendula_1780522344672.png"
  },
  {
    "id": 21,
    "nombre": "Semillas de Hinojo",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Cuenca Mediterránea",
    "descripcion": "Semillas con perfil anisado-dulce. Digestivo tradicional.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_hinojo_1780586638309.png"
  },
  {
    "id": 22,
    "nombre": "Mejorana",
    "icono": "🌿",
    "familia": "Lamiaceae",
    "origen": "Chipre, Turquía",
    "descripcion": "Prima dulce del orégano. Perfil floral-balsámico.",
    "perfiles": [
      "floral",
      "dulce"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/mejorana_1780586650236.png"
  },
  {
    "id": 23,
    "nombre": "Clavo de Olor",
    "icono": "🪵",
    "imagen": "images/ingredientes/clavo_de_olor_1780586666239.png",
    "familia": "Myrtaceae",
    "origen": "Islas Molucas, Indonesia",
    "descripcion": "Botones florales. Perfil intenso, cálido-dulce. Antiséptico.",
    "perfiles": [
      "floral",
      "terroso",
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 24,
    "nombre": "Pimienta Negra en Grano",
    "icono": "⚫",
    "imagen": "images/ingredientes/pimienta_negra_en_grano_1780607374211.png",
    "familia": "Piperaceae",
    "origen": "Costa Malabar, India",
    "descripcion": "'Oro negro'. El rey de las especias. Picante característico.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias"
  },
  {
    "id": 25,
    "nombre": "Semillas de Sésamo Blanco",
    "icono": "🌱",
    "familia": "Pedaliaceae",
    "origen": "África, India",
    "descripcion": "'Ábrete Sésamo'. Sabor nuez-dulce. Aceites omega-6.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_sesamo_blanco_1780607386308.png"
  },
  {
    "id": 26,
    "nombre": "Panko",
    "icono": "🌱",
    "familia": "Producto procesado",
    "origen": "Japón",
    "descripcion": "Pan rallado japonés. Textura aireada y crujiente.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/panko_1780522357731.png"
  },
  {
    "id": 27,
    "nombre": "Orégano",
    "icono": "🌿",
    "imagen": "images/ingredientes/oregano_1780607398178.png",
    "familia": "Lamiaceae",
    "origen": "Colinas del Mediterráneo",
    "descripcion": "Hojas con perfil intenso, terroso-picante. 'Alegría de la montaña'.",
    "perfiles": [
      "picante",
      "terroso"
    ],
    "categoria": "hierbas"
  },
  {
    "id": 28,
    "nombre": "Perejil",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Mediterráneo Central",
    "descripcion": "Hojas herbáceas con notas de anís. Purificador del aliento.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/perejil_1780522369560.png"
  },
  {
    "id": 29,
    "nombre": "Cebolla en Escama",
    "icono": "🌱",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Bulbo deshidratado. Dulzor concentrado. Base aromática universal.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cebolla_escama_1780522381262.png"
  },
  {
    "id": 30,
    "nombre": "Tomate Deshidratado",
    "icono": "🌱",
    "familia": "Solanaceae",
    "origen": "América del Sur",
    "descripcion": "Umami intenso. Glutamato natural concentrado.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/tomate_deshidratado_1780607411929.png"
  },
  {
    "id": 31,
    "nombre": "Levadura Nutricional",
    "icono": "🌱",
    "familia": "Saccharomyces",
    "origen": "Producción controlada",
    "descripcion": "Sabor umami-queso sin lácteos. Rica en vitaminas B.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/levadura_nutricional_1780607545599.png"
  },
  {
    "id": 32,
    "nombre": "Pistacho Partido",
    "icono": "🌱",
    "familia": "Anacardiaceae",
    "origen": "Irán, Sicilia",
    "descripcion": "Nuez verde esmeralda. Sabor dulce-terroso. 'Nuez sonriente'.",
    "perfiles": [
      "terroso",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pistacho_partido_1780607558393.png"
  },
  {
    "id": 33,
    "nombre": "Harina de Vino",
    "icono": "🌱",
    "familia": "Producto artesanal",
    "origen": "Traslasierra, Córdoba",
    "descripcion": "Orujo de Malbec. Polifenoles y antocianos. Sabor tánico.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/harina_de_vino_1780607568568.png"
  },
  {
    "id": 34,
    "nombre": "Carbón Activado",
    "icono": "🌱",
    "familia": "Carbono procesado",
    "origen": "Cáscara de coco",
    "descripcion": "Color negro intenso sin alterar sabor. Purificación ancestral.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/carbon_activado_1780607580853.png"
  },
  {
    "id": 35,
    "nombre": "Achiote",
    "icono": "🌱",
    "imagen": "images/ingredientes/achiote_1780607593247.png",
    "familia": "Bixaceae",
    "origen": "Amazonía, Centroamérica",
    "descripcion": "Semillas rojas. Colorante y sabor terroso-pimienta. Maya.",
    "perfiles": [
      "picante",
      "terroso"
    ],
    "categoria": "especias"
  },
  {
    "id": 36,
    "nombre": "Pimiento Gochugaru",
    "icono": "🌱",
    "imagen": "images/ingredientes/pimiento_gochugaru_1780607618849.png",
    "familia": "Solanaceae",
    "origen": "Corea",
    "descripcion": "Chile coreano. Picante moderado con dulzor frutal. Esencial kimchi.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias"
  },
  {
    "id": 38,
    "nombre": "Alga Kombu",
    "icono": "🌱",
    "familia": "Laminariaceae",
    "origen": "Mares de Japón",
    "descripcion": "Umami natural. Base del dashi japonés.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/alga_kombu_1780522405830.png"
  },
  {
    "id": 39,
    "nombre": "Mostaza Amarilla",
    "icono": "🌱",
    "imagen": "images/ingredientes/mostaza_amarilla_1780607630217.png",
    "familia": "Brassicaceae",
    "origen": "Cuenca Mediterránea",
    "descripcion": "Semillas suaves con picante moderado. Mustum ardens.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias"
  },
  {
    "id": 40,
    "nombre": "Mostaza Negra",
    "icono": "🌱",
    "imagen": "images/ingredientes/mostaza_negra_1780607642133.png",
    "familia": "Brassicaceae",
    "origen": "Sur de Asia",
    "descripcion": "Más picante que la amarilla. Esencial en tadka indio.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias"
  },
  {
    "id": 41,
    "nombre": "Ajedrea",
    "icono": "🌿",
    "imagen": "images/ingredientes/ajedrea_1780607653163.png",
    "familia": "Lamiaceae",
    "origen": "Mediterráneo, Cáucaso",
    "descripcion": "Hierba de los sátiros. Perfil picante-herbáceo.",
    "perfiles": [
      "picante"
    ],
    "categoria": "hierbas"
  },
  {
    "id": 42,
    "nombre": "Estragón",
    "icono": "🌱",
    "familia": "Asteraceae",
    "origen": "Siberia, Asia Central",
    "descripcion": "'Pequeño dragón'. Perfil anisado-licorizado. Finas hierbas.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/estragon_1780527004690.png"
  },
  {
    "id": 43,
    "nombre": "Semillas de Eneldo",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Perfil anisado-alcanforado. 'Dilla' = calmar.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_eneldo_1780527016761.png"
  },
  {
    "id": 44,
    "nombre": "Semillas de Amapola",
    "icono": "🌱",
    "familia": "Papaveraceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Semillas con sabor nuez-dulce. Panadería centroeuropea.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_amapola_1780527029886.png"
  },
  {
    "id": 45,
    "nombre": "Flor de Lavanda",
    "icono": "💜",
    "familia": "Lamiaceae",
    "origen": "Provenza, Francia",
    "descripcion": "Flores púrpuras. Perfil floral-alcanforado. 'Lavare'.",
    "perfiles": [
      "floral"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/flor_lavanda_1780527042904.png"
  },
  {
    "id": 46,
    "nombre": "Cáscara de Limón Deshidratada",
    "icono": "🍋",
    "familia": "Rutaceae",
    "origen": "Asia, Mediterráneo",
    "descripcion": "Zeste seco. Perfil cítrico intenso. Contra el escorbuto.",
    "perfiles": [
      "citrico"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/cascara_limon_1780527054606.png"
  },
  {
    "id": 47,
    "nombre": "Cáscara de Mandarina Deshidratada",
    "icono": "🍊",
    "familia": "Rutaceae",
    "origen": "China",
    "descripcion": "Chen pi medicinal. Más dulce y floral que limón.",
    "perfiles": [
      "floral",
      "citrico",
      "dulce"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/cascara_mandarina_1780527066746.png"
  },
  {
    "id": 48,
    "nombre": "Limón Marroquí Deshidratado",
    "icono": "🍋",
    "familia": "Rutaceae",
    "origen": "Marruecos",
    "descripcion": "Limones fermentados en sal. Sabor umami-cítrico. Tagines.",
    "perfiles": [
      "citrico",
      "umami"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/limon_marroqui_1780527078311.png"
  },
  {
    "id": 49,
    "nombre": "Café Tostado",
    "icono": "☕",
    "familia": "Rubiaceae",
    "origen": "Etiopía, Yemen",
    "descripcion": "Perfil amargo-caramelizado. 800+ compuestos aromáticos.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cafe_tostado_1780607664894.png"
  },
  {
    "id": 50,
    "nombre": "Cascarilla de Café",
    "icono": "☕",
    "familia": "Rubiaceae",
    "origen": "Fincas de café",
    "descripcion": "Cascara. Sabor dulce-afrutado con notas de hibisco.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cascarilla_de_cafe_1780607686807.png"
  },
  {
    "id": 51,
    "nombre": "Hongos Shiitake (Tallos)",
    "icono": "🌱",
    "familia": "Omphalotaceae",
    "origen": "Japón, China",
    "descripcion": "Umami concentrado. 'Seta del árbol shii'. Nobleza china.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/hongos_shiitake_tallos_1780607698173.png"
  },
  {
    "id": 52,
    "nombre": "Merkén Chileno",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "Araucanía, Chile",
    "descripcion": "Ají ahumado Mapuche. Patrimonio cultural de Chile.",
    "perfiles": [
      "picante",
      "ahumado"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/merken_chileno_1780607710108.png"
  },
  {
    "id": 53,
    "nombre": "Enebro",
    "icono": "🌱",
    "familia": "Cupressaceae",
    "origen": "Hemisferio Norte",
    "descripcion": "Bayas resinosas-pino. Base de la ginebra.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/enebro_1780667905409.png"
  },
  {
    "id": 54,
    "nombre": "Puerro Deshidratado",
    "icono": "🌱",
    "familia": "Amaryllidaceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Allium suave. Perfil cebolla-dulce. Símbolo de Gales.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/puerro_deshidratado_1780667920961.png"
  },
  {
    "id": 55,
    "nombre": "Pimienta Blanca en Grano",
    "icono": "⚫",
    "familia": "Piperaceae",
    "origen": "Costa Malabar, India",
    "descripcion": "Pimienta sin cáscara. Más suave y terrosa.",
    "perfiles": [
      "floral",
      "picante",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_blanca_en_grano_1780667934215.png"
  },
  {
    "id": 56,
    "nombre": "Pimienta Verde",
    "icono": "⚫",
    "familia": "Piperaceae",
    "origen": "India, Camboya",
    "descripcion": "Bayas inmaduras. Frescura herbácea. Cocina francesa.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_verde_1780667948043.png"
  },
  {
    "id": 57,
    "nombre": "Menta",
    "icono": "🌿",
    "familia": "Lamiaceae",
    "origen": "Europa, Asia",
    "descripcion": "Hojas refrescantes. Efecto mentolado. Digestivo.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/menta_1780667963605.png"
  },
  {
    "id": 58,
    "nombre": "Flor de Hibiscus",
    "icono": "🌺",
    "familia": "Malvaceae",
    "origen": "Asia, África",
    "descripcion": "Flores rojas. Sabor ácido-afrutado. Rica en vitamina C.",
    "perfiles": [
      "acido"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/flor_de_hibiscus_1780667977210.png"
  },
  {
    "id": 59,
    "nombre": "Cayena",
    "icono": "🌱",
    "familia": "Solanaceae",
    "origen": "América Central",
    "descripcion": "Chile muy picante. Activa la termogénesis.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cayena_1780667990956.png"
  },
  {
    "id": 60,
    "nombre": "Cacao en Polvo",
    "icono": "🌱",
    "familia": "Malvaceae",
    "origen": "América Central",
    "descripcion": "Alimento de los dioses. Perfil amargo-dulce.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cacao_en_polvo_1780668004910.png"
  },
  {
    "id": 61,
    "nombre": "Ají Molido",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "América del Sur",
    "descripcion": "Chile molido con picante moderado. Base de muchas cocinas latinas.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/aji_molido_1780668018687.png"
  },
  {
    "id": 62,
    "nombre": "Ajo en Escama",
    "icono": "🧄",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Láminas de ajo deshidratado. Sabor más suave que el granulado.",
    "perfiles": [
      "picante",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/ajo_en_escama_1780668032117.png"
  },
  {
    "id": 63,
    "nombre": "Anís",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Mediterráneo Oriental",
    "descripcion": "Semillas con sabor dulce-licorizado. Digestivo tradicional.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/anis_1780668056687.png"
  },
  {
    "id": 64,
    "nombre": "Anís Estrellado",
    "icono": "⭐",
    "imagen": "images/ingredientes/anis_estrellado_1780668070622.png",
    "familia": "Schisandraceae",
    "origen": "China, Vietnam",
    "descripcion": "Fruto en forma de estrella. Perfil anisado intenso. Esencial en pho.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 65,
    "nombre": "Azafrán en Hebras",
    "icono": "🧡",
    "familia": "Iridaceae",
    "origen": "Irán, Cachemira",
    "descripcion": "Estigmas enteros de crocus. La especia más cara del mundo.",
    "perfiles": [
      "floral",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/azafran_en_hebras_1780668085187.png"
  },
  {
    "id": 66,
    "nombre": "Azúcar Mascabo",
    "icono": "🍯",
    "familia": "Producto procesado",
    "origen": "India, América",
    "descripcion": "Azúcar integral sin refinar. Notas de caramelo y melaza.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/azucar_mascabo_1780668099469.png"
  },
  {
    "id": 67,
    "nombre": "Canela Entera",
    "icono": "🍂",
    "familia": "Lauraceae",
    "origen": "Sri Lanka",
    "descripcion": "Ramas de canela de Ceilán. Perfil dulce-especiado suave.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/canela_entera_1780668113128.png"
  },
  {
    "id": 68,
    "nombre": "Canela Quebrada",
    "icono": "🍂",
    "familia": "Lauraceae",
    "origen": "Sri Lanka",
    "descripcion": "Trozos de canela para infusiones y guisos prolongados.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/canela_quebrada_1780668126510.png"
  },
  {
    "id": 69,
    "nombre": "Cáscara de Naranja Deshidratada",
    "icono": "🍊",
    "familia": "Rutaceae",
    "origen": "Asia, Mediterráneo",
    "descripcion": "Zeste de naranja seco. Perfil cítrico-dulce.",
    "perfiles": [
      "citrico",
      "dulce"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/cascara_de_naranja_deshidratada_1780668141302.png"
  },
  {
    "id": 70,
    "nombre": "Cáscara de Pomelo Glasé",
    "icono": "🍊",
    "familia": "Rutaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Cáscara confitada con notas amargas y dulces.",
    "perfiles": [
      "citrico",
      "dulce"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/cascara_de_pomelo_glase_1780685906213.png"
  },
  {
    "id": 71,
    "nombre": "Cascarilla de Cacao",
    "icono": "🍫",
    "familia": "Malvaceae",
    "origen": "América Central",
    "descripcion": "Cáscara del grano de cacao. Perfil chocolate suave.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cascarilla_de_cacao_1780685918632.png"
  },
  {
    "id": 72,
    "nombre": "Cayena Amarilla",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "América Central",
    "descripcion": "Variedad de cayena menos picante, más frutal.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cayena_amarilla_1780685930845.png"
  },
  {
    "id": 73,
    "nombre": "Cayena Roja",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "América Central",
    "descripcion": "Chile muy picante. Activa la termogénesis.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cayena_roja_1780685943181.png"
  },
  {
    "id": 74,
    "nombre": "Cebolla en Polvo",
    "icono": "🧅",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Cebolla finamente molida. Se integra en mezclas homogéneas.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cebolla_en_polvo_1780685954211.png"
  },
  {
    "id": 75,
    "nombre": "Cebolla Crispy",
    "icono": "🧅",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Cebolla frita deshidratada. Textura crujiente.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cebolla_crispy_1780685966624.png"
  },
  {
    "id": 76,
    "nombre": "Cebolla de Verdeo",
    "icono": "🧅",
    "familia": "Amaryllidaceae",
    "origen": "Asia",
    "descripcion": "Cebollín deshidratado. Perfil suave y fresco.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/cebolla_de_verdeo_1780685979263.png"
  },
  {
    "id": 77,
    "nombre": "Chimichurri Parrillero",
    "icono": "🌿",
    "familia": "Mezcla",
    "origen": "Argentina",
    "descripcion": "Blend de hierbas para carnes asadas.",
    "perfiles": [
      "terroso",
      "picante"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/chimichurri_parrillero_1780685992201.png"
  },
  {
    "id": 78,
    "nombre": "Comino Molido",
    "icono": "🌱",
    "imagen": "images/ingredientes/comino_molido_1780686004546.png",
    "familia": "Apiaceae",
    "origen": "Levante, Egipto",
    "descripcion": "Comino en polvo. Aroma más intenso que en grano.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias"
  },
  {
    "id": 79,
    "nombre": "Comino Negro",
    "icono": "🌰",
    "familia": "Ranunculaceae",
    "origen": "Asia Occidental",
    "descripcion": "Nigella sativa. Sabor a nuez con notas de orégano.",
    "perfiles": [
      "terroso",
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/comino_negro_1780686017187.png"
  },
  {
    "id": 80,
    "nombre": "Cúrcuma en Raíz",
    "icono": "🌟",
    "familia": "Zingiberaceae",
    "origen": "Sur de Asia",
    "descripcion": "Rizoma entero de cúrcuma. Sabor más fresco que el polvo.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/curcuma_en_raiz_1780686051184.png"
  },
  {
    "id": 81,
    "nombre": "Espinaca Deshidratada",
    "icono": "🥬",
    "familia": "Amaranthaceae",
    "origen": "Persia",
    "descripcion": "Hojas de espinaca deshidratadas. Rica en hierro.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/espinaca_deshidratada_1780686064246.png"
  },
  {
    "id": 82,
    "nombre": "Jengibre Raíz",
    "icono": "🫚",
    "familia": "Zingiberaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Rizoma entero deshidratado. Más aromático que el polvo.",
    "perfiles": [
      "citrico",
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/jengibre_raiz_1780686076317.png"
  },
  {
    "id": 83,
    "nombre": "Jengibre Glasé",
    "icono": "🫚",
    "familia": "Zingiberaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Jengibre confitado. Perfil dulce-picante.",
    "perfiles": [
      "dulce",
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/jengibre_glase_1780686089178.png"
  },
  {
    "id": 84,
    "nombre": "Kümmel",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Europa",
    "descripcion": "Semillas de alcaravea. Sabor anisado-terroso.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/kummel_1780686102110.png"
  },
  {
    "id": 85,
    "nombre": "Laurel",
    "icono": "🌿",
    "familia": "Lauraceae",
    "origen": "Mediterráneo",
    "descripcion": "Hojas aromáticas para guisos y caldos.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/laurel_1780686115362.png"
  },
  {
    "id": 86,
    "nombre": "Mix de Pimientas",
    "icono": "⚫",
    "familia": "Piperaceae",
    "origen": "Varios",
    "descripcion": "Mezcla de pimientas negra, blanca, verde y rosa.",
    "perfiles": [
      "picante",
      "floral"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/mix_de_pimientas_1780686127678.png"
  },
  {
    "id": 87,
    "nombre": "Morrón Rojo Deshidratado",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "América",
    "descripcion": "Pimiento rojo dulce deshidratado. Notas dulces.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/morron_rojo_deshidratado_1780704461991.png"
  },
  {
    "id": 88,
    "nombre": "Morrón Verde Deshidratado",
    "icono": "🫑",
    "familia": "Solanaceae",
    "origen": "América",
    "descripcion": "Pimiento verde deshidratado. Sabor más vegetal.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/morron_verde_deshidratado_1780704473410.png"
  },
  {
    "id": 89,
    "nombre": "Nibs de Cacao",
    "icono": "🍫",
    "familia": "Malvaceae",
    "origen": "América Central",
    "descripcion": "Trozos de grano de cacao tostado. Sabor intenso.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/nibs_de_cacao_1780704486239.png"
  },
  {
    "id": 90,
    "nombre": "Nuez Moscada Molida",
    "icono": "🌰",
    "imagen": "images/ingredientes/nuez_moscada_molida_1780704496865.png",
    "familia": "Myristicaceae",
    "origen": "Islas Banda",
    "descripcion": "Nuez moscada en polvo. Lista para usar.",
    "perfiles": [
      "terroso",
      "dulce"
    ],
    "categoria": "especias"
  },
  {
    "id": 91,
    "nombre": "Pepino en Polvo",
    "icono": "🥒",
    "familia": "Cucurbitaceae",
    "origen": "India",
    "descripcion": "Pepino deshidratado molido. Sabor fresco.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pepino_en_polvo_1780704508054.png"
  },
  {
    "id": 92,
    "nombre": "Pimentón Nacional Dulce",
    "icono": "🔴",
    "familia": "Solanaceae",
    "origen": "Argentina",
    "descripcion": "Pimiento dulce argentino. Color rojo intenso.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimenton_nacional_dulce_1780704520676.png"
  },
  {
    "id": 93,
    "nombre": "Pimentón Nacional Picante",
    "icono": "🔴",
    "familia": "Solanaceae",
    "origen": "Argentina",
    "descripcion": "Pimiento picante argentino.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimenton_nacional_picante_1780704532632.png"
  },
  {
    "id": 94,
    "nombre": "Pimentón Nacional Ahumado",
    "icono": "🔴",
    "familia": "Solanaceae",
    "origen": "Argentina",
    "descripcion": "Pimiento ahumado argentino.",
    "perfiles": [
      "ahumado"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/pimenton_nacional_ahumado_1780704545074.png"
  },
  {
    "id": 95,
    "nombre": "Pimentón Español Picante",
    "icono": "🔴",
    "familia": "Solanaceae",
    "origen": "La Vera, España",
    "descripcion": "Pimentón de la Vera picante. DOP.",
    "perfiles": [
      "picante",
      "ahumado"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/pimenton_espanol_picante_1780704557291.png"
  },
  {
    "id": 96,
    "nombre": "Pimentón Español Ahumado",
    "icono": "🔴",
    "familia": "Solanaceae",
    "origen": "La Vera, España",
    "descripcion": "Pimentón de la Vera ahumado. DOP.",
    "perfiles": [
      "ahumado"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/pimenton_espanol_ahumado_1780704568400.png"
  },
  {
    "id": 97,
    "nombre": "Pimienta Blanca Molida",
    "icono": "⚪",
    "familia": "Piperaceae",
    "origen": "India",
    "descripcion": "Pimienta blanca en polvo. Más suave.",
    "perfiles": [
      "picante",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_blanca_molida_1780704595059.png"
  },
  {
    "id": 98,
    "nombre": "Pimienta de Jamaica",
    "icono": "⚫",
    "familia": "Myrtaceae",
    "origen": "Caribe",
    "descripcion": "Allspice. Sabor a clavo, canela y nuez moscada.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_de_jamaica_1780704606007.png"
  },
  {
    "id": 99,
    "nombre": "Pimienta Negra Molida",
    "icono": "⚫",
    "familia": "Piperaceae",
    "origen": "India",
    "descripcion": "Pimienta negra en polvo. Lista para usar.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_negra_molida_1780704617008.png"
  },
  {
    "id": 100,
    "nombre": "Pimienta Roja",
    "icono": "🔴",
    "familia": "Piperaceae",
    "origen": "Brasil",
    "descripcion": "Bayas de Schinus. Sabor dulce-picante.",
    "perfiles": [
      "picante",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimienta_roja.png"
  },
  {
    "id": 101,
    "nombre": "Poleo",
    "icono": "🌿",
    "familia": "Lamiaceae",
    "origen": "Mediterráneo",
    "descripcion": "Hierba mentolada para infusiones. Digestivo.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/poleo_1780704628208.png"
  },
  {
    "id": 102,
    "nombre": "Remolacha en Polvo",
    "icono": "🔴",
    "familia": "Amaranthaceae",
    "origen": "Europa",
    "descripcion": "Colorante natural. Sabor dulce-terroso.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/remolacha_en_polvo_1780704639438.png"
  },
  {
    "id": 103,
    "nombre": "Rooibos",
    "icono": "🍵",
    "familia": "Fabaceae",
    "origen": "Sudáfrica",
    "descripcion": "Té rojo sudafricano sin cafeína. Dulce y suave.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/rooibos_1780704650577.png"
  },
  {
    "id": 104,
    "nombre": "Ruibarbo",
    "icono": "🌱",
    "familia": "Polygonaceae",
    "origen": "Asia",
    "descripcion": "Tallos ácidos-dulces. Usado en postres y bebidas.",
    "perfiles": [
      "acido",
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/ruibarbo_1780754370679.png"
  },
  {
    "id": 105,
    "nombre": "Sal Marina Fina",
    "icono": "🧂",
    "familia": "Mineral",
    "origen": "Salinas del Atlántico",
    "descripcion": "Cristales finos de sal marina.",
    "perfiles": [
      "neutro"
    ],
    "categoria": "sales",
    "imagen": "images/ingredientes/sal_marina_fina_1780754386582.png"
  },
  {
    "id": 106,
    "nombre": "Sal Marina Gruesa",
    "icono": "🧂",
    "familia": "Mineral",
    "origen": "Salinas del Atlántico",
    "descripcion": "Cristales gruesos para molinillo o finishing.",
    "perfiles": [
      "neutro"
    ],
    "categoria": "sales",
    "imagen": "images/ingredientes/sal_marina_gruesa_1780754401412.png"
  },
  {
    "id": 107,
    "nombre": "Semillas de Sésamo Negro",
    "icono": "⚫",
    "familia": "Pedaliaceae",
    "origen": "África, Asia",
    "descripcion": "Sésamo negro con sabor más intenso y terroso.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_sesamo_negro_1780754414780.png"
  },
  {
    "id": 108,
    "nombre": "Semillas de Apio",
    "icono": "🌱",
    "familia": "Apiaceae",
    "origen": "Mediterráneo",
    "descripcion": "Sabor intenso a apio concentrado.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_apio_1780754428911.png"
  },
  {
    "id": 109,
    "nombre": "Semillas de Girasol",
    "icono": "🌻",
    "familia": "Asteraceae",
    "origen": "América del Norte",
    "descripcion": "Semillas nutritivas con sabor a nuez.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_girasol_1780754443315.png"
  },
  {
    "id": 110,
    "nombre": "Semillas de Lino",
    "icono": "🌱",
    "familia": "Linaceae",
    "origen": "Mesopotamia",
    "descripcion": "Ricas en omega-3. Sabor a nuez suave.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_lino_1780754457554.png"
  },
  {
    "id": 111,
    "nombre": "Semillas de Zapallo",
    "icono": "🎃",
    "familia": "Cucurbitaceae",
    "origen": "América",
    "descripcion": "Pepitas de calabaza. Sabor dulce-terroso.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_zapallo_1780754470544.png"
  },
  {
    "id": 112,
    "nombre": "Semillas de Chía",
    "icono": "🌱",
    "familia": "Lamiaceae",
    "origen": "México",
    "descripcion": "Superalimento rico en omega-3 y fibra.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/semillas_de_chia_1780754484603.png"
  },
  {
    "id": 113,
    "nombre": "Té Negro Nacional",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "Misiones, Argentina",
    "descripcion": "Té negro argentino. Sabor robusto y maltoso.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_negro_nacional_1780754497579.png"
  },
  {
    "id": 114,
    "nombre": "Té Rojo Nacional",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "Misiones, Argentina",
    "descripcion": "Té rojo argentino. Sabor suave y afrutado.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_rojo_nacional_1780754523784.png"
  },
  {
    "id": 115,
    "nombre": "Té Verde Nacional",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "Misiones, Argentina",
    "descripcion": "Té verde argentino. Fresco y vegetal.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_verde_nacional_1780754538477.png"
  },
  {
    "id": 116,
    "nombre": "Zanahoria Deshidratada",
    "icono": "🥕",
    "familia": "Apiaceae",
    "origen": "Afganistán",
    "descripcion": "Zanahoria seca. Dulzor natural concentrado.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/zanahoria_deshidratada_1780754553953.png"
  },
  {
    "id": 117,
    "nombre": "Zapallo Deshidratado",
    "icono": "🎃",
    "familia": "Cucurbitaceae",
    "origen": "América",
    "descripcion": "Calabaza deshidratada. Sabor dulce-terroso.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/zapallo_deshidratado_1780754567325.png"
  },
  {
    "id": 118,
    "nombre": "Algas Nori",
    "icono": "🌊",
    "familia": "Bangiaceae",
    "origen": "Japón",
    "descripcion": "Alga para sushi. Sabor marino umami.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/algas_nori_1780754580699.png"
  },
  {
    "id": 119,
    "nombre": "Hondashi",
    "icono": "🐟",
    "familia": "Producto procesado",
    "origen": "Japón",
    "descripcion": "Caldo de bonito en polvo. Base del dashi.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/hondashi_1780754594657.png"
  },
  {
    "id": 120,
    "nombre": "Ají Chaotián",
    "icono": "🌶️",
    "familia": "Solanaceae",
    "origen": "China",
    "descripcion": "Chile chino pequeño y muy picante.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/aji_chaotian_1780780503635.png"
  },
  {
    "id": 121,
    "nombre": "Hojas de Hinojo",
    "icono": "🌿",
    "familia": "Apiaceae",
    "origen": "Mediterráneo",
    "descripcion": "Frondas de hinojo. Sabor anisado suave.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/hojas_de_hinojo_1780780516778.png"
  },
  {
    "id": 122,
    "nombre": "Ajo Fresco",
    "icono": "🧄",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Ajo fresco deshidratado. Sabor más intenso.",
    "perfiles": [
      "picante"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/ajo_fresco_1780780529099.png"
  },
  {
    "id": 123,
    "nombre": "Cebolla Quemada Deshidratada",
    "icono": "🧅",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Cebolla caramelizada y deshidratada. Sabor ahumado-dulce.",
    "perfiles": [
      "ahumado",
      "dulce"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/cebolla_quemada_deshidratada_1780780541423.png"
  },
  {
    "id": 124,
    "nombre": "Miel en Polvo",
    "icono": "🍯",
    "familia": "Producto procesado",
    "origen": "Varios",
    "descripcion": "Miel deshidratada. Dulzor natural para mezclas secas.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/miel_en_polvo_1780780556247.png"
  },
  {
    "id": 125,
    "nombre": "Cebolla Morada en Polvo",
    "icono": "🧅",
    "familia": "Amaryllidaceae",
    "origen": "Asia Central",
    "descripcion": "Cebolla morada molida. Más dulce que la blanca.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/cebolla_morada_en_polvo_1780780568761.png"
  },
  {
    "id": 126,
    "nombre": "Leche de Coco en Polvo",
    "icono": "🥥",
    "familia": "Arecaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Leche de coco deshidratada. Cremosidad tropical.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/leche_de_coco_en_polvo_1780780579839.png"
  },
  {
    "id": 127,
    "nombre": "Coco Rallado",
    "icono": "🥥",
    "familia": "Arecaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Pulpa de coco deshidratada. Textura y dulzor.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/coco_rallado_1780780591915.png"
  },
  {
    "id": 128,
    "nombre": "Hongos de Pino",
    "icono": "🍄",
    "familia": "Suillaceae",
    "origen": "Patagonia",
    "descripcion": "Hongos silvestres de bosques de pino. Sabor terroso.",
    "perfiles": [
      "umami",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/hongos_de_pino_1780780603343.png"
  },
  {
    "id": 129,
    "nombre": "Pistacho Entero",
    "icono": "🌱",
    "familia": "Anacardiaceae",
    "origen": "Irán, Sicilia",
    "descripcion": "Pistachos enteros con cáscara.",
    "perfiles": [
      "dulce",
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pistacho_entero_1780780613892.png"
  },
  {
    "id": 130,
    "nombre": "Lemon Grass",
    "icono": "🌿",
    "familia": "Poaceae",
    "origen": "Sudeste Asiático",
    "descripcion": "Hierba limón. Perfil cítrico-floral intenso.",
    "perfiles": [
      "citrico",
      "floral"
    ],
    "categoria": "hierbas",
    "imagen": "images/ingredientes/lemon_grass_1780780625697.png"
  },
  {
    "id": 131,
    "nombre": "Durazno en Escamas",
    "icono": "🍑",
    "familia": "Rosaceae",
    "origen": "China",
    "descripcion": "Durazno deshidratado. Dulce y afrutado.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/durazno_en_escamas_1780780638527.png"
  },
  {
    "id": 132,
    "nombre": "Arándanos Deshidratados",
    "icono": "🫐",
    "familia": "Ericaceae",
    "origen": "América del Norte",
    "descripcion": "Berries secos. Ácido-dulce con antioxidantes.",
    "perfiles": [
      "dulce",
      "acido"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/arandanos_deshidratados.png"
  },
  {
    "id": 133,
    "nombre": "Rosa Mosqueta Fruto",
    "icono": "🌹",
    "familia": "Rosaceae",
    "origen": "Patagonia",
    "descripcion": "Fruto silvestre. Rico en vitamina C. Sabor ácido.",
    "perfiles": [
      "acido"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/rosa_mosqueta_fruto.png"
  },
  {
    "id": 134,
    "nombre": "Té Verde Importado Pekoe",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "China, Sri Lanka",
    "descripcion": "Té verde de hojas selectas. Delicado y vegetal.",
    "perfiles": [
      "terroso",
      "floral"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_verde_importado_pekoe.png"
  },
  {
    "id": 135,
    "nombre": "Manzanilla",
    "icono": "🌼",
    "familia": "Asteraceae",
    "origen": "Europa",
    "descripcion": "Flores para infusión. Relajante y digestiva.",
    "perfiles": [
      "floral",
      "dulce"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/manzanilla.png"
  },
  {
    "id": 136,
    "nombre": "Ñaco",
    "icono": "🌾",
    "familia": "Poaceae",
    "origen": "Chile, Argentina",
    "descripcion": "Harina tostada de trigo. Tradición mapuche.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/naco.png"
  },
  {
    "id": 137,
    "nombre": "Té Negro Premium",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "Misiones, Argentina",
    "descripcion": "Té negro de alta calidad. Hojas enteras.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_negro_premium.png"
  },
  {
    "id": 138,
    "nombre": "Humo en Polvo",
    "icono": "💨",
    "familia": "Producto procesado",
    "origen": "España",
    "descripcion": "Aroma de humo concentrado para ahumar en frío.",
    "perfiles": [
      "ahumado"
    ],
    "categoria": "ahumados",
    "imagen": "images/ingredientes/humo_en_polvo.png"
  },
  {
    "id": 139,
    "nombre": "Pimiento Verde Deshidratado",
    "icono": "🫑",
    "familia": "Solanaceae",
    "origen": "América",
    "descripcion": "Pimiento verde seco. Sabor vegetal intenso.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/pimiento_verde_deshidratado.png"
  },
  {
    "id": 140,
    "nombre": "Cáscara de Naranja Amarga",
    "icono": "🍊",
    "familia": "Rutaceae",
    "origen": "Mediterráneo",
    "descripcion": "Zeste de naranja amarga. Perfil intenso-amargo.",
    "perfiles": [
      "citrico"
    ],
    "categoria": "citricos",
    "imagen": "images/ingredientes/cascara_de_naranja_amarga.png"
  },
  {
    "id": 141,
    "nombre": "Manzana Deshidratada",
    "icono": "🍎",
    "familia": "Rosaceae",
    "origen": "Asia Central",
    "descripcion": "Chips de manzana. Dulzor natural concentrado.",
    "perfiles": [
      "dulce"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/manzana_deshidratada.png"
  },
  {
    "id": 142,
    "nombre": "Flor de Saúco",
    "icono": "🌸",
    "familia": "Adoxaceae",
    "origen": "Europa",
    "descripcion": "Flores aromáticas para infusiones. Delicado y floral.",
    "perfiles": [
      "floral"
    ],
    "categoria": "flores",
    "imagen": "images/ingredientes/flor_de_sauco.png"
  },
  {
    "id": 143,
    "nombre": "Genciana Raíz",
    "icono": "🌱",
    "familia": "Gentianaceae",
    "origen": "Alpes",
    "descripcion": "Raíz amarga. Base de aperitivos y digestivos.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/genciana_raiz.png"
  },
  {
    "id": 144,
    "nombre": "Té Rojo Pu-Erh",
    "icono": "🍵",
    "familia": "Theaceae",
    "origen": "Yunnan, China",
    "descripcion": "Té fermentado y añejado. Sabor terroso profundo.",
    "perfiles": [
      "terroso"
    ],
    "categoria": "tes",
    "imagen": "images/ingredientes/te_rojo_pu_erh.png"
  },
  {
    "id": 145,
    "nombre": "Hongo Shiitake Entero",
    "icono": "🍄",
    "familia": "Omphalotaceae",
    "origen": "Japón, China",
    "descripcion": "Setas shiitake enteras deshidratadas.",
    "perfiles": [
      "umami"
    ],
    "categoria": "especias",
    "imagen": "images/ingredientes/hongo_shiitake_entero.png"
  }
];

// Alias para compatibilidad con app.js (que usa minúscula)
const ingredientes = INGREDIENTES;
