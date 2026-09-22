import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  feedbackStatus: 'idle' | 'correct' | 'incorrect';
  isTransitioning: boolean;
  onSelectOption: (option: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  feedbackStatus,
  isTransitioning,
  onSelectOption,
}) => {
  // Visual math grouping for Grade 3 multiplication understanding
  const renderVisualAid = () => {
    if (question.id === 1) {
      // 1 × 8
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/80 my-2">
          <span className="text-xs font-bold text-slate-500 ml-2">مجموعة واحدة تحتوي على 8 عناصر:</span>
          <div className="flex gap-1.5 p-1.5 bg-white rounded-xl border border-amber-200 shadow-2xs">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-xl sm:text-2xl" role="img" aria-label="نجمة">
                ⭐
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (question.id === 2) {
      // 0 × 4
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/80 my-2">
          <span className="text-xs font-bold text-slate-500 ml-2">خاصية الضرب في صفر (لا توجد عناصر):</span>
          <div className="px-5 py-1.5 bg-white rounded-xl border-2 border-dashed border-slate-300 text-slate-400 font-bold text-xs sm:text-sm">
            صندوق فارغ 📦 (0)
          </div>
        </div>
      );
    }

    if (question.id === 3) {
      // 9 × 10
      return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/80 my-2">
          <span className="text-xs font-bold text-slate-500 ml-2">9 عشرات:</span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="inline-block px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-black"
              >
                10
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (question.id === 4) {
      // 2 × 7
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/80 my-2">
          <span className="text-xs font-bold text-slate-500 mb-1">مجموعتان في كل منهما 7 (مضاعفة العدد 7):</span>
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-amber-200">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-base sm:text-lg" role="img" aria-label="كرة">
                  🔵
                </span>
              ))}
            </div>
            <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-amber-200">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-base sm:text-lg" role="img" aria-label="كرة">
                  🔵
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id="question-container"
      className="bg-white rounded-3xl p-5 sm:p-8 border-3 border-amber-200/90 shadow-lg relative overflow-hidden"
    >
      {/* Decorative Qatari header ribbon */}
      <div className="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-[#8A1538] via-[#a31a43] to-[#8A1538]" />

      {/* Question Header badge */}
      <div className="flex items-center justify-between mb-3 pt-2">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8A1538]/10 text-[#8A1538] font-bold text-sm sm:text-base border border-[#8A1538]/20">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>السؤال {questionIndex + 1}: أوجد ناتج عملية الضرب</span>
        </span>
        <span className="text-xs text-slate-400 font-bold">
          اختر باللمس أو النقر فقط 👆
        </span>
      </div>

      {/* Main Equation Board - Smartboard size */}
      <div
        id="equation-board"
        className="my-3 py-6 px-4 bg-gradient-to-b from-amber-50/80 to-amber-100/40 rounded-3xl border-3 border-amber-300 text-center shadow-inner relative"
      >
        <div className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-wider font-sans select-none" dir="ltr">
          {question.equation}
        </div>
      </div>

      {/* Visual aid for grade 3 math concepts */}
      {renderVisualAid()}

      {/* Dynamic Feedback Display */}
      <div className="min-h-[76px] flex items-center justify-center my-3">
        <AnimatePresence mode="wait">
          {feedbackStatus === 'correct' && (
            <motion.div
              id="correct-feedback-badge"
              key="correct"
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-lg bg-emerald-500 text-white rounded-2xl p-3 sm:p-4 flex items-center justify-center gap-3 shadow-md border-2 border-emerald-600"
            >
              <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0 animate-bounce" />
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black block">
                  ✅ أحسنت! إجابة صحيحة
                </span>
                <span className="block text-xs sm:text-sm text-emerald-100 font-bold">
                  {questionIndex + 1 < totalQuestions ? 'جاري الانتقال إلى السؤال التالي...' : 'اكتملت جميع الأسئلة بنجاح!'}
                </span>
              </div>
            </motion.div>
          )}

          {feedbackStatus === 'incorrect' && (
            <motion.div
              id="incorrect-feedback-badge"
              key="incorrect"
              initial={{ x: [-10, 10, -10, 10, 0], opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg bg-rose-500 text-white rounded-2xl p-3 sm:p-4 flex items-center justify-center gap-3 shadow-md border-2 border-rose-600"
            >
              <XCircle className="w-8 h-8 text-white flex-shrink-0 animate-pulse" />
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black block">
                  ❌ حاول مرة أخرى
                </span>
                <span className="block text-xs sm:text-sm text-rose-100 font-bold">
                  فكّر في قاعدة الضرب جيداً واضغط على إجابة بديلة!
                </span>
              </div>
            </motion.div>
          )}

          {feedbackStatus === 'idle' && (
            <p className="text-slate-500 font-semibold text-sm sm:text-base text-center">
              المس أو انقر على الخيار الصحيح من الأزرار الثلاثة بالأسفل 👇
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* 3 Large Clickable Options for Smartboards */}
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            
            // Dynamic styling based on feedback
            let buttonStyle = 'bg-white hover:bg-amber-50 text-slate-800 border-3 border-amber-300 hover:border-[#8A1538] hover:shadow-lg';
            
            if (isSelected) {
              if (feedbackStatus === 'correct') {
                buttonStyle = 'bg-emerald-500 text-white border-3 border-emerald-600 shadow-xl scale-102 ring-4 ring-emerald-200';
              } else if (feedbackStatus === 'incorrect') {
                buttonStyle = 'bg-rose-50 text-rose-700 border-3 border-rose-400 shadow-sm';
              }
            }

            return (
              <motion.button
                key={option}
                id={`option-btn-${index}-${option}`}
                type="button"
                whileHover={{ scale: isTransitioning ? 1 : 1.03 }}
                whileTap={{ scale: isTransitioning ? 1 : 0.96 }}
                disabled={isTransitioning}
                onClick={() => onSelectOption(option)}
                className={`relative min-h-[100px] sm:min-h-[120px] w-full rounded-3xl p-4 flex flex-col items-center justify-center transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50 ${buttonStyle}`}
              >
                {/* Big number for touch on smartboard */}
                <span className="text-5xl sm:text-6xl md:text-7xl font-black font-sans tracking-tight" dir="ltr">
                  {option}
                </span>

                {/* Status badge when chosen */}
                {isSelected && feedbackStatus === 'correct' && (
                  <span className="absolute bottom-2 text-xs font-black bg-white/20 px-3 py-0.5 rounded-full">
                    ✅ إجابة صحيحة
                  </span>
                )}
                {isSelected && feedbackStatus === 'incorrect' && (
                  <span className="absolute bottom-2 text-xs font-black bg-rose-200/90 text-rose-900 px-3 py-0.5 rounded-full">
                    ❌ حاول ثانية
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
