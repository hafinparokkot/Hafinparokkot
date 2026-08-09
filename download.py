import urllib.request
import ssl
from PIL import Image

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://upload.wikimedia.org/wikipedia/en/e/ed/University_of_Calicut_logo.png', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as response, open('calicut_logo.png', 'wb') as out_file:
    out_file.write(response.read())

img = Image.open('calicut_logo.png')
img.save('calicut_logo.webp', 'WEBP')
print("Downloaded and converted Calicut University logo.")
