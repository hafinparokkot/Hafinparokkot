from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=240):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                # Change all white (also shades of whites)
                # pixels to transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "WEBP")
    except Exception as e:
        print(f"Failed {input_path}: {e}")

logos = [
    ("primenuts_logo.webp", "primenuts_logo.webp"),
    ("unipulp_logo.jpeg", "unipulp_logo.webp"),
    ("fanar_logo.webp", "fanar_logo.webp"),
    ("cococola_logo.avif", "cococola_logo.webp")
]

for src, dst in logos:
    print(f"Processing {src}")
    remove_white_bg(src, dst)

print("Done")
