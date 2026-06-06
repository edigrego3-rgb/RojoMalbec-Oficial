import os
import re

path = r'index.html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Fix the specific broken injection
text = text.replace('</h1>`n            <p class="slogan"', '</h1>\n            <p class="slogan"')
text = text.replace('olvid', 'olvidó')

# Fix corrupted strings due to bad powershell encoding write
text = text.replace('TǸs', 'Tés')
text = text.replace('Creǭ', 'Creá')
text = text.replace('Y>\'', '🛒')
text = text.replace('~', '☰')

# Make sure "olvidó" isn't duplicated
text = text.replace('olvidóó', 'olvidó')

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed index.html encoding!")
