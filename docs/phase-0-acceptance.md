# Phase 0 — Acceptance Contract

الحالة: **INCOMPLETE — LOCKFILE GATE**

تمت خطوات CI الأساسية بنجاح على commit `476e5ec5180108815cdff179963f69f9aff410b4`، لكن مراجعة المستودع أثبتت أن `package-lock.json` غير موجود في Git. لذلك لا يطابق البناء عقد Phase 0 الذي يشترط lockfile مثبتًا.

## الإجراء التصحيحي

تم تحديث CI في commit `f53b5ee749556e5f9ad27fc1b79badc7ce1f9a6b` ليقوم بتوليد lockfile عند غيابه، تثبيته في Git، ثم إعادة البوابة باستخدام `npm ci`.

## قرار البوابة

Phase 0 **لم تُغلق بعد**. لا يبدأ تنفيذ Phase 1 حتى ينجح CI على commit يحتوي `package-lock.json` فعليًا وتُثبت جميع بنود العقد على نفس النسخة.
