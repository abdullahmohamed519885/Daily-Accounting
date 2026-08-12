from bs4 import BeautifulSoup
from pathlib import Path

p=Path('/mnt/data/work2/index.html')
soup=BeautifulSoup(p.read_text(encoding='utf-8'),'html.parser')

mapping = {
    'اذكار الاستيقاظ':'bi-sunrise-fill',
    'السنة القبلية':'bi-stars',
    'السنة القبلية 4 ركعات':'bi-stars-fill',
    'الجماعة الاولي':'bi-people-fill',
    'أذكار بعد الصلاة':'bi-book-fill',
    'اذكار بعد الصلاة':'bi-book-fill',
    'أذكار الصباح':'bi-sun-fill',
    'اذكار الصباح':'bi-sun-fill',
    'الضحي 4 ركعات':'bi-brightness-high-fill',
    'السنة البعدية':'bi-stars',
    'أذكار المساء':'bi-moon-stars-fill',
    'الورد (ربعين)':'bi-journal-bookmark-fill',
    'حفظ نصف صفحة':'bi-bookmark-check-fill',
    'قراءة جزء يوميا':'bi-book-fill',
    'مراجعة الحفظ':'bi-arrow-repeat',
    'صيام يوم الاثنين':'bi-calendar-heart-fill',
    'صيام يوم الخميس':'bi-calendar-heart-fill',
    'صيام يوم 13 هجري':'bi-calendar-heart-fill',
    'صيام يوم 14 هجري':'bi-calendar-heart-fill',
    'صيام يوم 15 هجري':'bi-calendar-heart-fill',
    'الخلاء':'bi-door-open-fill',
    'لبس الثوب وخلعه':'bi-person-standing',
    'الوضوء':'bi-droplet-fill',
    'دخول المنزل والخروج':'bi-house-door-fill',
    'المسجد دخول وخروج':'bi-building-fill',
    'المشي إلي المسجد':'bi-person-walking',
    'الأكل والشرب':'bi-cup-hot-fill',
    'الركوب':'bi-car-front-fill',
    'الوتر':'bi-moon-stars-fill',
    'ركعتان قيام ليل':'bi-moon-stars-fill',
    'قبل النوم':'bi-moon-fill',
}

for h3 in soup.select('h3.fs-10'):
    title=' '.join(h3.get_text(' ', strip=True).split())
    if title in mapping:
        span=h3.find_next_sibling('span', class_='card-item-icon')
        if span:
            icon=span.find('i')
            if icon:
                # preserve any non-bi classes, replace Bootstrap icon classes
                classes=[c for c in icon.get('class',[]) if not c.startswith('bi-')]
                icon['class']=classes+[mapping[title]]
                span['data-icon-title']=title
                span['class']=['card-item-icon', 'semantic-card-icon']

# Fallback: any remaining generic people icons in task cards become a neutral activity icon.
for span in soup.select('span.card-item-icon'):
    icon=span.find('i')
    if icon and any(c=='bi-people-fill' for c in icon.get('class',[])):
        # only keep people for group cards
        title=span.get('data-icon-title','')
        if title != 'الجماعة الاولي':
            icon['class']=['bi-check2-circle']

p.write_text(str(soup),encoding='utf-8')
