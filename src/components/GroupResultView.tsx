import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { Star, Trophy, ArrowLeft, ArrowRight, Ticket, CheckCircle2, Users, Clock } from 'lucide-react';
import { StudentGroup } from '../types';
import { formatSecondsToMMSS } from '../data/groups';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface GroupResultViewProps {
  group: StudentGroup;
  onNextGroup: () => void;
  onViewLeaderboard: () => void;
  onBackToGroups: () => void;
}

export const GroupResultView: React.FC<GroupResultViewProps> = ({
  group,
  onNextGroup,
  onViewLeaderboard,
  onBackToGroups,
}) => {
  const isPerfectScore = group.score === 4;

  useEffect(() => {
    if (isPerfectScore) {
      // Fire festive celebration confetti
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;
      const colors = ['#8A1538', '#F59E0B', '#10B981', '#FFFFFF', '#6366F1'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isPerfectScore]);

  return (
    <motion.div
      id="group-result-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center relative overflow-hidden"
    >
      {/* Decorative top ribbon */}
      <div className={`absolute top-0 inset-x-0 h-4 bg-gradient-to-r ${group.colorTheme.bgGradient}`} />

      {/* Mascot and celebration icons */}
      <div className="flex flex-col items-center justify-center mt-2 mb-3">
        <motion.div
          animate={isPerfectScore ? { y: [0, -8, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-white p-1 mb-3"
        >
          <img
            src={mascotImage}
            alt="صديقكم حمد"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* 4 Golden Stars ⭐⭐⭐⭐ */}
        <div className="flex items-center justify-center gap-2 my-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 220 }}
            >
              <Star
                className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  i < group.score
                    ? 'fill-amber-400 text-amber-500 drop-shadow-[0_4px_6px_rgba(245,158,11,0.5)]'
                    : 'fill-slate-100 text-slate-300'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Group Header Badge */}
        <div className="flex items-center gap-2 text-xl font-black text-slate-800 mt-1">
          <span>{group.colorTheme.emoji}</span>
          <span>{group.name}</span>
        </div>

        {/* Required Headline and subtitle */}
        {isPerfectScore ? (
          <>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-4xl font-black text-[#8A1538] mt-2 mb-1"
            >
              «رائع! لقد حصلت على بطاقة الدخول 🎫»
            </motion.h2>

            <p className="text-slate-700 font-black text-lg sm:text-xl mb-4 text-emerald-700">
              «أحسنتم يا أبطال الرياضيات!» 🌟
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-black text-[#8A1538] mt-2 mb-1">
              محاولة ممتازة يا أبطال {group.name}! 👏
            </h2>
            <p className="text-slate-600 font-bold text-base mb-4">
              أحسنتم التعاون والمثابرة في حل مسائل الضرب
            </p>
          </>
        )}
      </div>

      {/* The Printable / Visual Official Entrance Ticket Card */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        id="entrance-ticket"
        className="max-w-xl mx-auto bg-gradient-to-br from-amber-50/90 via-white to-amber-100/50 rounded-2xl p-5 sm:p-6 border-3 border-dashed border-[#8A1538] shadow-md relative text-right mb-6"
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b-2 border-[#8A1538]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-7 h-7 text-[#8A1538]" />
            <div>
              <div className="text-xs font-bold text-[#8A1538]">دولة قطر • وزارة التربية والتعليم والتعليم العالي</div>
              <div className="text-lg font-black text-slate-900">بطاقة الدخول الرسمية (مادة الرياضيات)</div>
            </div>
          </div>
          <div className="bg-[#8A1538] text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isPerfectScore ? 'مُجتاز بتفوق 4/4' : `النتيجة ${group.score}/4`}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3 text-sm">
          <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
            <div className="text-xs text-slate-500 font-medium">المجموعة</div>
            <div className="font-black text-slate-900 flex items-center gap-1">
              <span>{group.colorTheme.emoji}</span>
              <span>{group.name}</span>
            </div>
          </div>

          <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
            <div className="text-xs text-slate-500 font-medium">النتيجة (الدقة)</div>
            <div className="font-black text-[#8A1538] text-base" dir="ltr">
              {group.score} / 4
            </div>
          </div>

          <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 font-medium">الوقت المستغرق (السرعة)</div>
            <div className="font-black text-slate-800 font-mono text-base" dir="ltr">
              {formatSecondsToMMSS(group.timeTakenSeconds)}
            </div>
          </div>
        </div>

        {/* Students list */}
        <div className="mt-3 pt-2.5 border-t border-amber-200">
          <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>فريق العمل الطلابي:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.students.map((student, idx) => (
              <span
                key={idx}
                className="bg-amber-100/70 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-200"
              >
                {student}
              </span>
            ))}
          </div>
        </div>

        {/* Stamped Seal */}
        <div className="absolute -bottom-3 -left-2 sm:left-4 rotate-[-10deg] bg-amber-400 text-[#8A1538] border-2 border-[#8A1538] px-3 py-1 rounded-xl font-black text-xs shadow-md uppercase">
          معتمد للتحدي النهائي 🏅
        </div>
      </motion.div>

      {/* Action Buttons as requested: «التالي» to advance to next group */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
        <button
          type="button"
          id="next-group-btn"
          onClick={onNextGroup}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#8A1538] hover:bg-[#72102e] text-white font-black text-xl shadow-lg cursor-pointer transition-all active:scale-95 min-w-[200px]"
        >
          <span>التالي ⏭️</span>
        </button>

        <button
          type="button"
          onClick={onViewLeaderboard}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-lg shadow-md cursor-pointer transition-all active:scale-95"
        >
          <Trophy className="w-5 h-5" />
          <span>جدول النتائج والتتويج 🏆</span>
        </button>

        <button
          type="button"
          onClick={onBackToGroups}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base cursor-pointer transition-colors"
        >
          <span>قائمة المجموعات</span>
        </button>
      </div>
    </motion.div>
  );
};
