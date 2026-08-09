import urllib.request
import json
import ssl
from PIL import Image
import io

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://en.wikipedia.org/w/api.php?action=query&titles=File:University_of_calicut_logo.png&prop=imageinfo&iiprop=url&format=json"

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as response:
    data = json.loads(response.read().decode())
    pages = data['query']['pages']
    for page_id in pages:
        image_url = pages[page_id]['imageinfo'][0]['url']
        print(f"Found URL: {image_url}")
        
        # Download it
        img_req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(img_req, context=ctx) as img_resp:
            img = Image.open(io.BytesIO(img_resp.read()))
            img.save('calicut_logo.webp', 'WEBP')
            print("Saved as calicut_logo.webp")
