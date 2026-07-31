import os
from PIL import Image

MAX_SIZE = 1920
QUALITY = 75

def optimize_image(filepath):
    try:
        size_mb = os.path.getsize(filepath) / (1024 * 1024)
        if "favicon.png" in filepath:
            print(f"Optimizing favicon: {filepath}")
            with Image.open(filepath) as img:
                img = img.resize((128, 128), Image.Resampling.LANCZOS)
                img.save(filepath, optimize=True)
            return

        if size_mb > 0.5:
            print(f"Optimizing {filepath} (Size: {size_mb:.2f} MB)")
            with Image.open(filepath) as img:
                if img.mode != 'RGB' and filepath.lower().endswith('.jpg'):
                    img = img.convert('RGB')
                
                # Resize if too large
                if img.width > MAX_SIZE or img.height > MAX_SIZE:
                    img.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
                
                img.save(filepath, optimize=True, quality=QUALITY)
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    # Optimize favicon
    if os.path.exists("favicon.png"):
        optimize_image("favicon.png")
    
    # Optimize gallery images
    if os.path.exists("images"):
        for root, _, files in os.walk("images"):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    optimize_image(os.path.join(root, file))
    
    # optimize root images
    if os.path.exists("og_image.png"):
        optimize_image("og_image.png")
    if os.path.exists("hero_bg.png"):
        optimize_image("hero_bg.png")

print("Optimization complete.")
