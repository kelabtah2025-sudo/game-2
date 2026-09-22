import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentGroup } from '../types';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  starsCount: number;
  score: number;
  group: StudentGroup;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  starsCount,
  score,
  group,
}) => {
  const currentStep = Math.min(currentIndex + 1, totalQuestions);
  const progressPercent = Math.round((currentStep / totalQuestions) * 100);

  return (
    <div
      id="quiz-progress-section"
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border-2 border-amber-200/90 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Step indicator: 1 من 4 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-sm font-black text-slate-800">
            <span>{group.colorTheme.emoji}</span>
            <span>{group.name}</span>
          </div>

          <div className="text-base sm:text-lg font-black text-slate-800">
            <span className="text-slate-500 font-bold ml-1 text-sm sm:text-base">السؤال:</span>
            <span className="text-[#8A1538] text-xl sm:text-2xl font-black">{currentStep} من {totalQuestions}</span>
          </div>
        </div>

        {/* Stars (⭐ ⭐ ⭐ ☆) & Points (النقاط: 3 / 4) as requested in prompt */}
        <div className="flex items-center gap-3">
          {/* Stars visual display */}
          <div
            id="stars-container"
            className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs"
          >
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isEarned = idx < starsCount;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={isEarned ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Star
                    className={`w-6 h-6 transition-all duration-300 ${
                      isEarned
                        ? 'fill-amber-400 text-amber-500 drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]'
                        : 'text-slate-300 fill-slate-100'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Points display: النقاط: 3 / 4 */}
          <div
            id="current-score-badge"
            className="flex items-center gap-1.5 bg-[#8A1538]/10 px-3.5 py-1.5 rounded-xl border border-[#8A1538]/20 font-black text-slate-800 text-sm sm:text-base"
          >
            <span className="text-[#8A1538]">النقاط:</span>
            <span className="text-xl font-black text-[#8A1538]" dir="ltr">
              {score} / {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
        <motion.div
          id="progress-bar-fill"
          className="h-full bg-gradient-to-r from-[#8A1538] via-[#a31a43] to-amber-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
