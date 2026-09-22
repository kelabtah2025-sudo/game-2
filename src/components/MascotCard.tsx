import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Lightbulb } from 'lucide-react';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface MascotCardProps {
  feedbackStatus: 'idle' | 'correct' | 'incorrect';
  hint: string;
  showHint: boolean;
  onToggleHint: () => void;
}

export const MascotCard: React.FC<MascotCardProps> = ({
  feedbackStatus,
  hint,
  showHint,
  onToggleHint,
}) => {
  let speechText = 'هيا يا بطل! اختر الإجابة الصحيحة لتحصل على بطاقة الدخول 🎫';
  let badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';

  if (feedbackStatus === 'correct') {
    speechText = 'ما شاء الله عليك! إجابة صحيحة وذكية يا بطل! 🌟';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (feedbackStatus === 'incorrect') {
    speechText = 'لا بأس يا صديقي، فكّر بهدوء وحاول مرة ثانية! 💪';
    badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
  }

  return (
    <div
      id="mascot-section"
      className="bg-gradient-to-br from-amber-50/90 to-orange-50/70 border-2 border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden shadow-sm"
    >
      {/* Student Mascot Image */}
      <div className="relative flex-shrink-0">
        <motion.div
          animate={
            feedbackStatus === 'correct'
              ? { scale: [1, 1.08, 1], y: [0, -6, 0] }
              : feedbackStatus === 'incorrect'
              ? { x: [-3, 3, -3, 3, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{ duration: feedbackStatus === 'idle' ? 3 : 0.5, repeat: feedbackStatus === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-amber-300 shadow-md bg-white p-1"
        >
          <img
            src={mascotImage}
            alt="صديقك حمد - الطالب القطري المتميز"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
        {/* Name Tag */}
        <div className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-[#8A1538] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
          صديقك حَمَد 🇶🇦
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 w-full text-right">
        <div className="relative bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-amber-200/80 shadow-sm">
          <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
            {speechText}
          </p>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 pt-2.5 border-t border-amber-100 flex items-start gap-2 text-xs sm:text-sm text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200"
              >
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{hint}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint toggle button */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            id="hint-toggle-btn"
            onClick={onToggleHint}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A1538] hover:text-[#70102d] bg-white hover:bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? 'إخفاء التلميح' : 'هل تحتاج مساعدة؟ (تلميح)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
