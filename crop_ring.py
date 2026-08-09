from PIL import Image
import os

img_path = 'C:/Users/INFO/.gemini/antigravity/brain/8695e017-435f-40a6-adcf-57d14ce8347a/jyothirmai_edited_1786274247994.jpg'
if os.path.exists(img_path):
    img = Image.open(img_path)
    width, height = img.size
    
    # Crop 10% from each side
    crop_factor = 0.10
    left = int(width * crop_factor)
    top = int(height * crop_factor)
    right = int(width * (1 - crop_factor))
    bottom = int(height * (1 - crop_factor))
    
    cropped = img.crop((left, top, right, bottom))
    if cropped.mode != 'RGB':
        cropped = cropped.convert('RGB')
    cropped.save('jyothirmai.webp', 'WEBP', quality=85)
    print("Cropped 10% of GENERATED photo and saved to jyothirmai.webp")
else:
    print("Image not found")
