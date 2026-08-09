from PIL import Image

def process_coca_cola(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        r, g, b, a = item
        # If green + blue is low, it's red background. We turn red to transparent.
        if g + b < 200 and r > 150:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            # The rest (white text) stays solid white
            new_data.append((255, 255, 255, a))

    img.putdata(new_data)
    img.save(output_path, "WEBP")
    print("Fixed Coca Cola logo")

process_coca_cola("cococola_logo.avif", "cococola_logo.webp")
