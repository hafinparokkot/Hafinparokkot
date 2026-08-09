from PIL import Image

def recolor_dark_to_white(input_path, output_path, threshold=150):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        if item[3] == 0:
            new_data.append(item)
            continue
            
        r, g, b, a = item
        # We target dark pixels, including anti-aliased dark pixels which might have slight color
        if r < threshold and g < threshold and b < threshold:
            new_data.append((255, 255, 255, a))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "WEBP")
    print(f"Processed {input_path} -> {output_path}")

recolor_dark_to_white("fanar_logo.webp", "fanar_logo.webp", threshold=160)
recolor_dark_to_white("cococola_logo.webp", "cococola_logo.webp", threshold=160)
