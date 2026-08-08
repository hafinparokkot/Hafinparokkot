from PIL import Image, ImageDraw

def make_round_favicon(input_path, output_path, border_color="#0284c7", border_width=15):
    img = Image.open(input_path).convert("RGBA")
    
    # Make it square if it isn't
    size = min(img.size)
    left = (img.size[0] - size) / 2
    top = (img.size[1] - size) / 2
    right = (img.size[0] + size) / 2
    bottom = (img.size[1] + size) / 2
    img = img.crop((left, top, right, bottom))
    
    # Resize to standard large icon size
    img = img.resize((512, 512), Image.Resampling.LANCZOS)
    
    # Create mask for circle
    mask = Image.new("L", (512, 512), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, 512, 512), fill=255)
    
    # Apply mask
    output = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    
    # Draw border
    draw_out = ImageDraw.Draw(output)
    draw_out.ellipse((border_width/2, border_width/2, 512 - border_width/2, 512 - border_width/2), 
                     outline=border_color, width=border_width)
    
    # Save
    output.save(output_path, format="PNG")

if __name__ == "__main__":
    make_round_favicon("hafin.jpg", "favicon.png")
