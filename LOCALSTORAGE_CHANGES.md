# Quiz App - localStorage Implementation

## O'zgarishlar Haqida

Quiz ilovasi endi **database o'rniga localStorage** ishlatadi. Bu quyidagi afzalliklarga ega:

✅ **Browser refresh bo'lganda ham ma'lumotlar saqlanadi**  
✅ **Test yakunlanmaguncha barcha javoblar saqlanib turadi**  
✅ **Server ga so'rov yuborish kerak emas**  
✅ **Tezroq ishlaydi**  

## Qanday Ishlaydi?

### 1. **Zustand Persist Middleware**
`client/src/store/quiz.store.ts` faylida Zustand store `persist` middleware bilan o'ralgan:

```typescript
export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({ /* state */ }),
    {
      name: 'quiz-storage', // localStorage key
      partialize: (state) => ({ /* saqlanadigan ma'lumotlar */ }),
    }
  )
);
```

Bu avtomatik ravishda barcha state o'zgarishlarini localStorage ga yozadi.

### 2. **Saqlanadigan Ma'lumotlar**

localStorage da quyidagi ma'lumotlar saqlanadi:
- `level` - Test darajasi (beginner/intermediate/advanced)
- `currentQuestionIndex` - Hozirgi savol raqami
- `answers` - Foydalanuvchi javoblari (questionId -> optionId)
- `isFinished` - Test tugaganmi?
- `score` - To'plangan ball
- `totalQuestions` - Jami savollar soni
- `startTime` - Test boshlangan vaqt
- `timeRemaining` - Qolgan vaqt

### 3. **Browser Refresh**

Agar foydalanuvchi testni yechayotganda browser refresh qilsa:
1. Zustand persist middleware avtomatik ravishda localStorage dan ma'lumotlarni yuklaydi
2. Foydalanuvchi qayerda qolgan bo'lsa, o'sha joydan davom etadi
3. Barcha javoblar saqlanib qoladi

### 4. **Test Yakunlanganda**

Test tugagach:
1. Natija localStorage ga saqlanadi
2. Foydalanuvchi `/result` sahifasiga yo'naltiriladi
3. Result sahifa localStorage dan natijalarni o'qiydi va ko'rsatadi

### 5. **localStorage Tozalanishi**

localStorage quyidagi holatlarda tozalanadi:
- **"Back to Home" tugmasi bosilganda** - `resetQuiz()` chaqiriladi
- **"Retry Quiz" tugmasi bosilganda** - `resetQuiz()` chaqiriladi
- **Yangi test boshlaganda** - `initQuiz()` chaqiriladi

## O'zgartirilgan Fayllar

### ✅ Yangi Fayllar
- `client/src/lib/quiz-storage.ts` - localStorage utility funksiyalar

### ✅ O'zgartirilgan Fayllar
1. **`client/src/store/quiz.store.ts`**
   - Zustand persist middleware qo'shildi
   - `initQuiz()` va `setTimeRemaining()` funksiyalar qo'shildi
   - State ga yangi fieldlar qo'shildi

2. **`client/src/pages/QuizPage.tsx`**
   - Database submission o'chirildi
   - localStorage ga avtomatik saqlash
   - Browser refresh dan keyin restore

3. **`client/src/pages/ResultPage.tsx`**
   - URL params o'rniga localStorage dan o'qiydi
   - `handleGoHome` funksiya qo'shildi

4. **`client/src/features/result/ui/ResultSummary.tsx`**
   - `onGoHome` prop qo'shildi
   - "Back to Home" tugmasi localStorage ni tozalaydi

5. **`client/src/hooks/use-quiz.ts`**
   - `useSubmitQuizResult` hook o'chirildi (database kerak emas)

## Database To'liq O'chirildi

Database butunlay olib tashlandi:

- ❌ `server/db.ts` fayli o'chirildi
- ❌ `drizzle.config.ts` fayli o'chirildi
- ❌ `DATABASE_URL` environment variable o'chirildi
- ❌ `POST /api/quiz/submit-result` endpoint o'chirildi
- ❌ Database table definitions (`quizResults`, `insertQuizResultSchema`) o'chirildi
- ✅ Quiz savollari hali ham server dan olinadi (`GET /api/quiz/:level`)
- ✅ localStorage faqat client-side da ishlaydi
- ✅ App endi database ulanishisiz ishlaydi

## Test Qilish

1. **Testni boshlang**: Biror darajani tanlang
2. **Bir nechta savolga javob bering**
3. **Browser ni refresh qiling** (F5 yoki Ctrl+R)
4. **Natija**: Barcha javoblaringiz saqlanib qolgan bo'ladi
5. **Testni yakunlang**: Natijalar ko'rsatiladi
6. **"Back to Home" bosing**: localStorage tozalanadi

## Xulosa

Endi quiz ilovasi to'liq client-side storage ishlatadi. Bu:
- Tezroq
- Soddaroq
- Browser refresh dan xavfsiz
- Server yukini kamaytiradi
