import os
from PIL import Image

files = [
    "nair chithra.jpeg",
    "khulood.png",
    "jyothirmai.jpeg",
    "dhanesh.jpeg"
]

for f in files:
    if os.path.exists(f):
        base, ext = os.path.splitext(f)
        new_name = base + ".webp"
        with Image.open(f) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')
            img.save(new_name, "WEBP", quality=80)
            print(f"Converted {f} to {new_name}")
    else:
        print(f"File not found: {f}")
