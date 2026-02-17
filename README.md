<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# برنامج إدارة الاشتراكات السنوية
# Annual Subscription Management System

تطبيق ويب لإدارة الاشتراكات السنوية للزبائن وأجهزة التتبع GPS الخاصة بهم.

A web application for managing annual subscriptions for customers and their GPS tracking devices.

## المميزات | Features

- ✅ إدارة بيانات الزبائن | Customer management
- ✅ إدارة الأجهزة والاشتراكات | Device and subscription management  
- ✅ متابعة الاشتراكات القريبة من الانتهاء | Track expiring subscriptions
- ✅ واجهة عربية سهلة الاستخدام | Easy-to-use Arabic interface
- ✅ حفظ البيانات محلياً | Local data storage
- ✅ نشر تلقائي على GitHub Pages | Automatic deployment to GitHub Pages

## التشغيل المباشر | Live Demo

يمكنك الوصول للتطبيق على: | Access the app at:
**https://saidzoubir1987.github.io/micogps123/**

## التشغيل المحلي | Run Locally

**المتطلبات | Prerequisites:** Node.js

1. تثبيت المكتبات | Install dependencies:
   ```bash
   npm install
   ```

2. تشغيل التطبيق | Run the app:
   ```bash
   npm run dev
   ```

3. افتح المتصفح على | Open browser at:
   ```
   http://localhost:3000
   ```

## البناء والنشر | Build & Deploy

### البناء المحلي | Local Build
```bash
npm run build
npm run preview
```

### النشر على GitHub Pages | Deploy to GitHub Pages

التطبيق يتم نشره تلقائياً على GitHub Pages عند الدفع إلى الفرع الرئيسي.

The app is automatically deployed to GitHub Pages when pushing to the main branch.

**خطوات التفعيل | Activation Steps:**

1. اذهب إلى إعدادات المشروع | Go to repository Settings
2. اختر Pages من القائمة الجانبية | Select Pages from sidebar
3. تحت "Build and deployment" اختر Source: GitHub Actions
4. احفظ التغييرات | Save changes

بعد ذلك، أي دفع (push) للفرع الرئيسي سيقوم بنشر التطبيق تلقائياً.

After that, any push to the main branch will automatically deploy the app.

## البنية التقنية | Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (inline styles)
- **Storage:** LocalStorage (demo mode)
- **Deployment:** GitHub Pages + GitHub Actions

## الاستخدام | Usage

1. **لوحة التحكم | Dashboard**: عرض إحصائيات عامة عن الزبائن والأجهزة
2. **الزبائن | Customers**: إضافة وتعديل وحذف بيانات الزبائن وأجهزتهم
3. **زبائن جدد | New Customers**: عرض آخر الزبائن المضافين

## ملاحظات | Notes

- البيانات محفوظة في LocalStorage للعرض التوضيحي
- Data is stored in LocalStorage for demonstration
- يمكن دمج Google Sheets API لحفظ البيانات سحابياً
- Can integrate Google Sheets API for cloud storage

View your app in AI Studio: https://ai.studio/apps/drive/1C0V-4XbnoAU5NQisAxKMMvUDVnC7QcLt
