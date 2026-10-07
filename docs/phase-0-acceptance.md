# Phase 0 — Acceptance Contract

الحالة الحالية: IN PROGRESS

## يجب أن يثبت هذا العقد
- المستودع مستقل عن المحاولات السابقة.
- الدستور الهندسي موجود ويمنع البناء العشوائي والانتقال المبكر وترك الأخطاء.
- متطلبات المنتج موثقة ومصنفة.
- تطبيق Next.js أساسي يعمل.
- endpoint الصحة يعمل في development وproduction.
- TypeScript strict يمر.
- ESLint يمر.
- اختبارات Node الأساسية تمر.
- production build يمر.
- production startup + /api/health يمران.
- package-lock.json موجود ومثبت في Git.
- لا أسرار حقيقية في source.
- نفس commit الذي يعلن PASS هو الذي خضع للاختبار.

## ممنوع في Phase 0
- Core HR business logic.
- Attendance business logic.
- Payroll.
- AI features.
- Government integrations.
- أي جدول قاعدة بيانات أعمال لم يُعتمد في Phase 1.

## معيار PASS
PASS فقط إذا كانت جميع البنود أعلاه مثبتة في CI على commit محدد.
أي بند غير مثبت = INCOMPLETE.
