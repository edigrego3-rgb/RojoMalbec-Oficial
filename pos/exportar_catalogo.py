import pandas as pd
import json
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import unicodedata

# ----------------- MAPA EXTRAIDO DEL ERP -----------------
MAP_CODIGOS_POS = {
    "sal al malbec": "RM-SAL-MAL",
    "sal british": "RM-SAL-BRI",
    "sal de limon y chile": "RM-SAL-LCH",
    "sal de limon y chile (suave)": "RM-SAL-LCH",
    "sal de rosas y romero": "RM-SAL-ROS",
    "sal del desierto": "RM-SAL-DES",
    "sal negra hawaiana": "RM-SAL-HAW",
    "sal negra tipo hawaiana": "RM-SAL-HAW",
    "sal esvanetian": "RM-SAL-ESV",
    "sal svanetian": "RM-SAL-ESV",
    "sal vikinga ahumada": "RM-SAL-VIK",
    "ajo a las hierbas": "RM-BLE-AJO",
    "ajo a las hierbas gourmet": "RM-BLE-AJO",
    "bbq": "RM-BLE-BBQ",
    "bbq rojo malbec": "RM-BLE-BBQ",
    "curry colombo": "RM-BLE-COL",
    "nanami togarashi": "RM-BLE-NAN",
    "nanami tōgarashi": "RM-BLE-NAN",
    "za'atar": "RM-BLE-ZAA",
    "zaatar": "RM-BLE-ZAA",
    "sloopy joe": "RM-BLE-SLO",
    "sloppy joe": "RM-BLE-SLO",
    "gluhwein": "RM-BLE-GLU",
    "glühwein": "RM-BLE-GLU",
    "panch phoron": "RM-BLE-PAN",
    "pesto siciliano con pistacho": "RM-BLE-PES",
    "mole mexicano": "RM-BLE-MOL",
    "mole mexicano de autor": "RM-BLE-MME",
    "espana profunda": "RM-BLE-ESP",
    "españa profunda": "RM-BLE-ESP",
    "dry hot honey": "RM-BLE-DRY",
    "vital caldo": "RM-VIT-CAL",
    "vital italia": "RM-VIT-ITA",
    "vital india": "RM-VIT-IND",
    "vital parrilera": "RM-VIT-PAR",
    "vital criollo": "RM-VIT-CRI",
    "vital citrus": "RM-VIT-CIT",
    "vital tipo queso": "RM-VIT-QUE",
    "vital tipo queso - perfil parmesano reserva": "RM-VIT-QUE",
    "pimienta negra": "RM-PIM-NEG",
    "pimienta negra de autor": "RM-PIM-NEG",
    "pimienta roja y larga": "RM-PIM-ROJ",
    "pimienta roja y pimienta larga": "RM-PIM-ROJ",
    "pimienta verde": "RM-PIM-VER",
    "pimienta verde de autor": "RM-PIM-VER",
    "te pu-erh": "RM-TEA-PUE",
    "te pu erh": "RM-TEA-PUE",
    "te pu-erh rojo malbec": "RM-TEA-PUE",
    "rooibos ambar": "RM-TEA-ROO",
    "rooibos : ambar africano": "RM-TEA-ROO"
}

def auto_generar_codigo(nombre):
    palabras = str(nombre).upper().split()
    if len(palabras) >= 2: return f"RM-{palabras[0][:3]}-{palabras[1][:3]}"
    if len(palabras) == 1: return f"RM-PRO-{palabras[0][:3]}"
    return "RM-GEN-001"

def obtener_codigo_vendedor(codigo_actual, nombre_producto):
    if codigo_actual and str(codigo_actual).startswith("RM-"): return str(codigo_actual).strip()
    
    # Manejar unicode
    nom_clean = unicodedata.normalize('NFKD', str(nombre_producto)).encode('ASCII', 'ignore').decode('utf-8').lower()
    nom_clean = " ".join(nom_clean.split())
    
    if nom_clean in MAP_CODIGOS_POS: return MAP_CODIGOS_POS[nom_clean]
    
    # Intento literal sin limpiar
    nom_lit = " ".join(str(nombre_producto).lower().split())
    if nom_lit in MAP_CODIGOS_POS: return MAP_CODIGOS_POS[nom_lit]
    
    # Por las dudas, tambien intentamos con el Codigo viejo o L SLCH
    # Pero el ERP asume que si NO esta en MAP_CODIGOS_POS, genera auto
    return auto_generar_codigo(nombre_producto)
# ---------------------------------------------------------

creds_dict = json.load(open(r'I:\Mi unidad\RojoMalbec_App\claves\rojomalbecapp-366a663c2610.json'))
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
client = gspread.authorize(creds)

sheet = client.open('RojoMalbec DB').worksheet('recetas')
data = sheet.get_all_records()

catalogo = []
for row in data:
    if str(row.get('Archivada', '')).upper() != 'TRUE':
        # CALCULAR EL CÓDIGO RM PARA POS
        cod_rm = obtener_codigo_vendedor(row.get('Codigo'), row.get('Nombre', ''))
        
        catalogo.append({
            'Codigo': cod_rm,  # Mapear el codigo viejo a la version RM
            'Nombre': row['Nombre'],
            'Precio_Mayorista': row['Precio_Mayorista'] if row['Precio_Mayorista'] != '' else 0,
            'Precio_Venta': row['Precio_Venta'] if row['Precio_Venta'] != '' else 0,
            'CodigoLote': row['Codigo'] # Para uso interno
        })

output_path = r'I:\Mi unidad\RojoMalbec_App\BlendBuilder_Ecommerce\pos\catalogo.js'
with open(output_path, 'w', encoding='utf-8') as f:
    json_str = json.dumps(catalogo, indent=4, ensure_ascii=False)
    f.write(f"const catalogo_data = {json_str};")