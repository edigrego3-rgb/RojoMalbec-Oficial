import os
import json
import re

base_dir = r"I:\Mi unidad\RojoMalbec_App\BlendBuilder_Ecommerce"
img_dir = os.path.join(base_dir, "images", "ingredientes")
js_path = os.path.join(base_dir, "data", "ingredientes.js")

mapping = {
    # Old mappings
    "alga_kombu": "Alga Kombu",
    "azafran_polvo": "Azafrán en Polvo",
    "cebolla_escama": "Cebolla en Escama",
    "comino_grano": "Comino en Grano",
    "flor_calendula": "Flor de Caléndula",
    "nuez_moscada": "Nuez Moscada",
    "panko": "Panko",
    "perejil": "Perejil",
    "pimienta_sichuan": "Pimienta de Sichuan",
    "tomillo": "Tomillo",
    "cascara_limon": "Cáscara de Limón Deshidratada",
    "cascara_mandarina": "Cáscara de Mandarina Deshidratada",
    "estragon": "Estragón",
    "flor_lavanda": "Flor de Lavanda",
    "limon_marroqui": "Limón Marroquí Deshidratado",
    "semillas_amapola": "Semillas de Amapola",
    "semillas_eneldo": "Semillas de Eneldo",
    "cardamomo_negro": "Cardamomo Negro",
    "pimienta_roja": "Pimienta Roja",
    "petalos_de_rosas": "Pétalos de Rosas",
    "sal_marina_liberato_entrefina": "Sal Marina Liberato Entrefina",
    "sumac": "Sumac",
    "cardamomo": "Cardamomo",
    "pimienta_larga": "Pimienta Larga",
    "curcuma_en_polvo": "Cúrcuma en Polvo",
    "coriandro": "Coriandro",
    "canela_en_polvo": "Canela en Polvo",
    "romero": "Romero",
    "albahaca": "Albahaca",
    "pimenton_espanol_dulce": "Pimentón Español (Dulce)",
    "ajo_granulado": "Ajo Granulado",
    "jengibre_en_polvo": "Jengibre en Polvo",
    "fenogreco": "Fenogreco",
    "semillas_de_hinojo": "Semillas de Hinojo",
    "mejorana": "Mejorana",
    "clavo_de_olor": "Clavo de Olor",
    "pimienta_negra_en_grano": "Pimienta Negra en Grano",
    "semillas_de_sesamo_blanco": "Semillas de Sésamo Blanco",
    "oregano": "Orégano",
    "tomate_deshidratado": "Tomate Deshidratado",
    "levadura_nutricional": "Levadura Nutricional",
    "pistacho_partido": "Pistacho Partido",
    "harina_de_vino": "Harina de Vino",
    "carbon_activado": "Carbón Activado",
    "achiote": "Achiote",
    "pimiento_gochugaru": "Pimiento Gochugaru",
    "mostaza_amarilla": "Mostaza Amarilla",
    "mostaza_negra": "Mostaza Negra",
    "ajedrea": "Ajedrea",
    "cafe_tostado": "Café Tostado",
    "cascarilla_de_cafe": "Cascarilla de Café",
    "hongos_shiitake_tallos": "Hongos Shiitake (Tallos)",
    "merken_chileno": "Merkén Chileno",
    "enebro": "Enebro",
    "puerro_deshidratado": "Puerro Deshidratado",
    "pimienta_blanca_en_grano": "Pimienta Blanca en Grano",
    "pimienta_verde": "Pimienta Verde",
    "menta": "Menta",
    "flor_de_hibiscus": "Flor de Hibiscus",
    "cayena": "Cayena",
    "cacao_en_polvo": "Cacao en Polvo",
    "aji_molido": "Ají Molido",
    "ajo_en_escama": "Ajo en Escama",
    "anis": "Anís",
    "anis_estrellado": "Anís Estrellado",
    "azafran_en_hebras": "Azafrán en Hebras",
    "azucar_mascabo": "Azúcar Mascabo",
    "canela_entera": "Canela Entera",
    "canela_quebrada": "Canela Quebrada",
    "cascara_de_naranja_deshidratada": "Cáscara de Naranja Deshidratada",
    "cascara_de_pomelo_glase": "Cáscara de Pomelo Glasé",
    "cascarilla_de_cacao": "Cascarilla de Cacao",
    "cayena_amarilla": "Cayena Amarilla",
    "cayena_roja": "Cayena Roja",
    "cebolla_en_polvo": "Cebolla en Polvo",
    "cebolla_crispy": "Cebolla Crispy",
    "cebolla_de_verdeo": "Cebolla de Verdeo",
    "chimichurri_parrillero": "Chimichurri Parrillero",
    "comino_molido": "Comino Molido",
    "comino_negro": "Comino Negro",
    "curcuma_en_raiz": "Cúrcuma en Raíz",
    "espinaca_deshidratada": "Espinaca Deshidratada",
    "jengibre_raiz": "Jengibre Raíz",
    "jengibre_glase": "Jengibre Glasé",
    "kummel": "Kümmel",
    "laurel": "Laurel",
    "mix_de_pimientas": "Mix de Pimientas",
    # New batch 16
    "morron_rojo_deshidratado": "Morrón Rojo Deshidratado",
    "morron_verde_deshidratado": "Morrón Verde Deshidratado",
    "nibs_de_cacao": "Nibs de Cacao",
    "nuez_moscada_molida": "Nuez Moscada Molida",
    "pepino_en_polvo": "Pepino en Polvo",
    "pimenton_nacional_dulce": "Pimentón Nacional Dulce",
    "pimenton_nacional_picante": "Pimentón Nacional Picante",
    "pimenton_nacional_ahumado": "Pimentón Nacional Ahumado",
    "pimenton_espanol_picante": "Pimentón Español Picante",
    "pimenton_espanol_ahumado": "Pimentón Español Ahumado",
    "pimienta_blanca_molida": "Pimienta Blanca Molida",
    "pimienta_de_jamaica": "Pimienta de Jamaica",
    "pimienta_negra_molida": "Pimienta Negra Molida",
    "poleo": "Poleo",
    "remolacha_en_polvo": "Remolacha en Polvo",
    "rooibos": "Rooibos"
}

with open(js_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const INGREDIENTES = (\[.*?\]);', content, re.DOTALL)
json_str = match.group(1)
data = json.loads(json_str)

images = [f for f in os.listdir(img_dir) if f.endswith('.png')]

# Clear all old image paths first
for item in data:
    item['imagen'] = ""

updated = 0
for img in images:
    prefix = img.split('_178')[0].replace('.png', '')
    
    target_name = mapping.get(prefix)
    if not target_name:
        target_name = mapping.get(img.replace('.png', ''))
        
    if target_name:
        for item in data:
            if item['nombre'] == target_name:
                item['imagen'] = "images/ingredientes/" + img
                updated += 1
                break

new_json_str = json.dumps(data, indent=2, ensure_ascii=False)
new_content = content[:match.start(1)] + new_json_str + content[match.end(1):]

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Update complete! {updated} images linked perfectly.")
