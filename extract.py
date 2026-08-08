import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

m_hero = re.search(r'(<div class="hero-bg">.*?</div>)', html, re.DOTALL)
print('HERO FULL:', m_hero.group(1) if m_hero else 'None')

m_about = re.search(r'(<div class="about-bg-wrapper">.*?</div>)', html, re.DOTALL)
print('ABOUT FULL:', m_about.group(1) if m_about else 'None')
