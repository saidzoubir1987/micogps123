# دليل النشر على GitHub Pages
# GitHub Pages Deployment Guide

## خطوات تفعيل GitHub Pages

### 1. الوصول إلى إعدادات المشروع
1. اذهب إلى صفحة المشروع على GitHub
2. اضغط على تبويب **Settings** (الإعدادات)

### 2. تفعيل GitHub Pages
1. من القائمة الجانبية، اختر **Pages**
2. تحت قسم **Build and deployment**:
   - **Source**: اختر **GitHub Actions**
   - سيتم تفعيل النشر التلقائي تلقائياً

### 3. دمج التغييرات
1. قم بدمج (Merge) هذا الـ Pull Request إلى الفرع الرئيسي (main/master)
2. سيتم تشغيل سير العمل (Workflow) تلقائياً
3. يمكنك متابعة التقدم من تبويب **Actions**

### 4. الوصول للتطبيق
بعد اكتمال النشر (عادة 2-3 دقائق):
- الرابط: `https://saidzoubir1987.github.io/micogps123/`
- يمكنك إيجاد الرابط في Settings > Pages

---

## Steps to Enable GitHub Pages

### 1. Access Repository Settings
1. Go to your repository page on GitHub
2. Click on the **Settings** tab

### 2. Enable GitHub Pages
1. From the sidebar, select **Pages**
2. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - Automatic deployment will be enabled

### 3. Merge Changes
1. Merge this Pull Request to the main branch (main/master)
2. The workflow will run automatically
3. You can monitor progress from the **Actions** tab

### 4. Access Your Application
After deployment completes (usually 2-3 minutes):
- URL: `https://saidzoubir1987.github.io/micogps123/`
- You can find the URL in Settings > Pages

---

## إعادة النشر | Redeploy

لإعادة النشر، قم بأحد التالي:
- ادفع (Push) تغييرات جديدة إلى الفرع الرئيسي
- من تبويب Actions، اختر "Deploy to GitHub Pages" واضغط "Run workflow"

To redeploy:
- Push new changes to the main branch
- From the Actions tab, select "Deploy to GitHub Pages" and click "Run workflow"

---

## استكشاف الأخطاء | Troubleshooting

### إذا لم يعمل التطبيق | If the app doesn't work:

1. **تحقق من حالة النشر | Check deployment status**:
   - اذهب إلى تبويب Actions
   - تأكد من نجاح آخر تشغيل للـ workflow

2. **تحقق من إعدادات GitHub Pages**:
   - Settings > Pages
   - تأكد أن Source مضبوط على "GitHub Actions"

3. **تحقق من الأذونات | Check permissions**:
   - Settings > Actions > General
   - تحت "Workflow permissions"
   - تأكد من تفعيل "Read and write permissions"

4. **امسح الذاكرة المؤقتة | Clear cache**:
   - امسح ذاكرة المتصفح المؤقتة
   - جرب الوصول في وضع التصفح الخفي

---

## معلومات إضافية | Additional Information

### البنية التقنية | Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Storage**: LocalStorage (demo mode)
- **CI/CD**: GitHub Actions

### الميزات | Features
- ✅ إدارة الزبائن والأجهزة | Customer & device management
- ✅ اشتراكات سنوية | Annual subscriptions
- ✅ تنبيهات الاشتراكات المنتهية | Expiration alerts
- ✅ واجهة عربية | Arabic interface
- ✅ نشر تلقائي | Auto-deployment
