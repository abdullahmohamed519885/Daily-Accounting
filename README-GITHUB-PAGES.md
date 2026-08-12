# أذكاري — GitHub Pages PWA

هذه النسخة مجهزة للنشر مباشرة على GitHub Pages، مع نافذة تثبيت احترافية ودعم PWA.

## النشر
1. ارفع **محتويات هذا المجلد** إلى Repository في GitHub.
2. من **Settings → Pages** اختر **Deploy from a branch**.
3. اختر `main` و`/ (root)` ثم Save.
4. افتح رابط GitHub Pages عبر `https://`.

## مهم
- يجب أن يكون `index.html` و`manifest.json` و`service-worker.js` في جذر الموقع المنشور.
- لا تفتح المشروع عبر `file://`.
- بعد رفع تحديثات جديدة، إذا ظهرت نسخة قديمة: افتح DevTools → Application → Service Workers ثم Unregister، وبعدها Hard Reload مرة واحدة.
- Chrome/Edge قد يؤخران `beforeinstallprompt`. لذلك زر التثبيت في هذه النسخة **لا يختفي** أثناء انتظار الحدث.

## سلوك زر التثبيت
- إذا كان التثبيت متاحًا: يفتح نافذة تثبيت المتصفح الأصلية.
- إذا لم يكن متاحًا بعد: تظهر نافذة تعليمات مناسبة للمتصفح.
- إذا كان التطبيق مثبتًا: يظهر زر أخضر بحالة التثبيت.
- على iPhone/iPad: تظهر تعليمات Add to Home Screen.
