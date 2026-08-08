import re

# Read HTML
with open('index.html', encoding='utf-8') as f:
    html = f.read()

# The original strings (they might be minified or not, so we use regex)
img_pattern = r'<img[^>]*src="images/hero_lab\.jpg"[^>]*>'
video_pattern = r'<video[^>]*>.*?<source[^>]*src="intro\.mp4"[^>]*>.*?</video>'

# Find the matches to ensure they exist
img_match = re.search(img_pattern, html, re.DOTALL)
video_match = re.search(video_pattern, html, re.DOTALL)

if img_match and video_match:
    img_str = img_match.group(0)
    video_str = video_match.group(0)
    
    # We want to put the video where the image was, and the image where the video was
    # But we also should update their class names for consistency
    new_video_str = video_str.replace('about-bg-video', 'hero-bg-video')
    new_img_str = img_str.replace('hero-bg-img', 'about-bg-img')
    
    # Replace in HTML
    # We have to be careful not to replace both at once with string replace if they are somehow identical, 
    # but they are different. We'll replace the exact original strings.
    html = html.replace(img_str, new_video_str)
    html = html.replace(video_str, new_img_str)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("HTML swapped successfully.")
else:
    print("Could not find image or video in HTML.")

# Read CSS
with open('style.css', encoding='utf-8') as f:
    css = f.read()

# Replace class names in CSS
css = css.replace('.hero-bg-img', '.about-bg-img')
css = css.replace('.about-bg-video', '.hero-bg-video')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("CSS updated successfully.")
