# دليل تحسين محركات البحث والنشر
## SEO & Deployment Guide

---

## 🎯 تحسين محركات البحث (SEO)

### 1. Meta Tags الأساسية

أضف هذه الـ Meta Tags في `<head>` من ملف index.html:

```html
<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- SEO Meta Tags -->
<title>مكتب المحاماة | خدمات قانونية متكاملة في السعودية</title>
<meta name="description" content="مكتب محاماة متخصص في القانون المدني والجنائي والأحوال الشخصية وقضايا الشركات. خبرة 15 عاماً في المملكة العربية السعودية.">
<meta name="keywords" content="محامي, محاماة, قانوني, استشارات قانونية, محامي الرياض, قضايا مدنية, قضايا جنائية">
<meta name="author" content="مكتب المحاماة">
<meta name="robots" content="index, follow">
<meta name="language" content="Arabic">
<meta name="revisit-after" content="7 days">

<!-- Open Graph (Facebook) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.lawfirm.com/">
<meta property="og:title" content="مكتب المحاماة - خدمات قانونية احترافية">
<meta property="og:description" content="نحمي حقوقك بكل أمانة واحترافية. خبرة 15 عاماً في مختلف المجالات القانونية.">
<meta property="og:image" content="https://www.lawfirm.com/images/og-image.jpg">
<meta property="og:locale" content="ar_SA">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.lawfirm.com/">
<meta name="twitter:title" content="مكتب المحاماة - خدمات قانونية احترافية">
<meta name="twitter:description" content="نحمي حقوقك بكل أمانة واحترافية">
<meta name="twitter:image" content="https://www.lawfirm.com/images/twitter-card.jpg">

<!-- Canonical URL -->
<link rel="canonical" href="https://www.lawfirm.com/">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

---

### 2. Structured Data (Schema.org)

أضف هذا الكود في نهاية ملف HTML قبل إغلاق `</body>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "مكتب المحاماة",
  "description": "مكتب محاماة متخصص في القانون المدني والجنائي والأحوال الشخصية",
  "url": "https://www.lawfirm.com",
  "telephone": "+966-11-123-4567",
  "email": "info@lawfirm.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "شارع الملك فيصل، برج المحاماة، الطابق 15",
    "addressLocality": "الرياض",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "24.7135517",
    "longitude": "46.6752957"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/lawfirm",
    "https://twitter.com/lawfirm",
    "https://www.linkedin.com/company/lawfirm"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  }
}
</script>
```

---

### 3. Sitemap.xml

أنشئ ملف `sitemap.xml` في المجلد الرئيسي:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.lawfirm.com/</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.lawfirm.com/#about</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.lawfirm.com/#practice-areas</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.lawfirm.com/#contact</loc>
    <lastmod>2026-02-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

### 4. Robots.txt

أنشئ ملف `robots.txt` في المجلد الرئيسي:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://www.lawfirm.com/sitemap.xml
```

---

### 5. تحسينات إضافية

#### أ. تحسين الصور
```html
<!-- استخدم alt text وصفي -->
<img src="lawyer.jpg" alt="محامي متخصص في القانون المدني في الرياض" loading="lazy">

<!-- استخدم صيغة WebP -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="وصف الصورة">
</picture>
```

#### ب. تحسين السرعة
```html
<!-- Preconnect للخطوط والموارد الخارجية -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload للموارد المهمة -->
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="script.js" as="script">
```

---

## 🚀 النشر على الإنترنت

### 1. استضافة مجانية (للتجربة)

#### أ. GitHub Pages
```bash
# 1. أنشئ repository على GitHub
# 2. ارفع الملفات
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/lawfirm.git
git push -u origin main

# 3. فعّل GitHub Pages من Settings
# الرابط سيكون: https://username.github.io/lawfirm/
```

#### ب. Netlify
```bash
# 1. سجل في Netlify
# 2. اسحب المجلد وأفلته في Netlify
# 3. الموقع سيكون جاهز في دقائق
# الرابط: https://random-name.netlify.app
```

#### ج. Vercel
```bash
# 1. سجل في Vercel
# 2. اربط GitHub repository
# 3. deploy تلقائي
# الرابط: https://lawfirm.vercel.app
```

---

### 2. استضافة مدفوعة (للإنتاج)

#### أ. استضافات عربية موصى بها:
- **STC Cloud** (سعودية)
- **Zain Cloud** (خليجية)
- **Namedah** (سعودية)
- **HostGator MENA**

#### ب. استضافات عالمية:
- **SiteGround** (موصى به لـ WordPress)
- **DigitalOcean** (VPS)
- **AWS** (احترافي)
- **Google Cloud**

---

### 3. خطوات النشر على cPanel

```bash
# 1. اشترِ Domain واستضافة
# 2. افتح cPanel
# 3. File Manager → public_html
# 4. ارفع جميع الملفات
# 5. تأكد من البنية:
public_html/
├── index.html
├── styles.css
├── script.js
├── contact-handler.php
├── .htaccess
└── images/
```

---

### 4. ملف .htaccess (لـ Apache Server)

أنشئ ملف `.htaccess`:

```apache
# Enable GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Enable Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}\.html -f
RewriteRule ^(.*)$ $1.html [L]

# Custom Error Pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Security Headers
<IfModule mod_headers.c>
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 📊 أدوات القياس والتحليل

### 1. Google Analytics
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Google Search Console
- سجل في Google Search Console
- أضف الموقع
- تحقق من الملكية
- أرسل Sitemap

### 3. Facebook Pixel
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## ✅ قائمة التحقق قبل النشر

- [ ] اختبار الموقع على جميع المتصفحات
- [ ] اختبار الموقع على جميع الأجهزة (Mobile, Tablet, Desktop)
- [ ] تحسين جميع الصور (ضغط الحجم)
- [ ] إضافة Meta Tags
- [ ] إضافة Structured Data
- [ ] إنشاء Sitemap.xml
- [ ] إنشاء Robots.txt
- [ ] تفعيل SSL Certificate (HTTPS)
- [ ] اختبار النماذج
- [ ] اختبار السرعة (Google PageSpeed Insights)
- [ ] اختبار SEO (Lighthouse)
- [ ] إضافة Google Analytics
- [ ] إضافة Google Search Console
- [ ] اختبار روابط التواصل الاجتماعي
- [ ] إضافة صفحة 404
- [ ] إضافة سياسة الخصوصية
- [ ] إضافة الشروط والأحكام
- [ ] إنشاء نسخة احتياطية

---

## 🔧 أدوات الاختبار

### 1. اختبار السرعة
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Pingdom**: https://tools.pingdom.com/

### 2. اختبار SEO
- **Google Search Console**
- **Ahrefs Site Audit**
- **SEMrush Site Audit**

### 3. اختبار التوافق
- **BrowserStack**: https://www.browserstack.com/
- **Can I Use**: https://caniuse.com/
- **Responsive Design Checker**: https://responsivedesignchecker.com/

### 4. اختبار الأمان
- **SSL Labs**: https://www.ssllabs.com/ssltest/
- **Security Headers**: https://securityheaders.com/

---

## 📱 نصائح للنجاح

1. **محتوى عربي عالي الجودة**: استخدم لغة عربية فصحى واضحة
2. **تحديث مستمر**: أضف مقالات قانونية بانتظام
3. **سرعة الموقع**: اجعل الموقع سريع جداً (أقل من 3 ثواني)
4. **Mobile First**: أغلب الزوار من الجوال
5. **Local SEO**: استهدف منطقتك الجغرافية
6. **التواصل الاجتماعي**: انشر المحتوى على جميع المنصات
7. **Google My Business**: أنشئ حساب وفعّله
8. **آراء العملاء**: اطلب من العملاء كتابة تقييمات

---

## 💰 تقدير التكاليف السنوية

| الخدمة | التكلفة التقريبية |
|--------|-------------------|
| Domain (.com) | $10-15/سنة |
| استضافة مشتركة | $50-100/سنة |
| SSL Certificate | مجاني (Let's Encrypt) |
| Google Workspace | $6/مستخدم/شهر |
| **المجموع** | **~$120-200/سنة** |

---

**للمزيد من المساعدة، راجع الوثائق الرسمية أو تواصل مع مطور ويب محترف.**
