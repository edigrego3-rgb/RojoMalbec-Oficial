import os
import json
import re
import unicodedata

def clean_name(name):
    name = name.lower()
    name = unicodedata.normalize('NFKD', name).encode('ASCII', 'ignore').decode('utf-8')
    return name

base_dir = r"I:\Mi unidad\RojoMalbec_App\BlendBuilder_Ecommerce"
img_dir = os.path.join(base_dir, "images", "ingredientes")
js_path = os.path.join(base_dir, "data", "ingredientes.js")

# Get list of new images
valid_images = []
for f in os.listdir(img_dir):
    if f.endswith('.png') and os.path.isfile(os.path.join(img_dir, f)):
        valid_images.append(f)

# Read JS file
with open(js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON
match = re.search(r'const INGREDIENTES = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Could not find INGREDIENTES array")
    exit(1)

json_str = match.group(1)
data = json.loads(json_str)

# Update data
updated_count = 0
for item in data:
    name_clean = clean_name(item['nombre'])
    # Try to find a matching image file
    matched_img = None
    
    # Custom matches based on how we generated them
    search_terms = name_clean.split(' ')
    
    # E.g. "sal marina" -> sal_marina
    # Let's check against our valid images
    for img in valid_images:
        img_name = img.split('_178')[0] # remove timestamp
        img_name = img_name.replace('.png', '')
        
        # Check if img_name is a substring of clean_name or vice versa
        # Example: 'comino_grano' matches 'comino en grano'
        img_clean = img_name.replace('_', ' ')
        
        if img_clean in name_clean or name_clean in img_clean or img_name in name_clean.replace(' ', '_'):
            matched_img = img
            break
            
    # Some hardcoded fallbacks
    if not matched_img:
        if "limon marroqui" in name_clean: matched_img = [i for i in valid_images if "limon_marroqui" in i][0] if any("limon_marroqui" in i for i in valid_images) else None
        elif "cascara de limon" in name_clean: matched_img = [i for i in valid_images if "cascara_limon" in i][0] if any("cascara_limon" in i for i in valid_images) else None
        elif "cascara de mandarina" in name_clean: matched_img = [i for i in valid_images if "cascara_mandarina" in i][0] if any("cascara_mandarina" in i for i in valid_images) else None
        elif "hongos shiitake (tallos)" in name_clean: matched_img = [i for i in valid_images if "shiitake" in i][0] if any("shiitake" in i for i in valid_images) else None

    if matched_img:
        item['imagen'] = "images/ingredientes/" + matched_img
        updated_count += 1
    else:
        item['imagen'] = "" # Clear old cuenco image if no new one is found

# Reconstruct the file
new_json_str = json.dumps(data, indent=2, ensure_ascii=False)
new_content = content[:match.start(1)] + new_json_str + content[match.end(1):]

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Successfully updated {updated_count} images!")
