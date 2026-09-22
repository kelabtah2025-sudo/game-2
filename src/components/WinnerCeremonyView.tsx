import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Sparkles, RotateCcw, ArrowRight, Award, Users, Heart } from 'lucide-react';
import { StudentGroup } from '../types';
import { rankGroups, formatSecondsToMMSS } from '../data/groups';
import { soundManager } from '../utils/audio';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface WinnerCeremonyViewProps {
  groups: StudentGroup[];
  onBackToLeaderboard: () => void;
  onResetChallenge: () => void;
}

export const WinnerCeremonyView: React.FC<WinnerCeremonyViewProps> = ({
  groups,
  onBackToLeaderboard,
  onResetChallenge,
}) => {
  const ranked = rankGroups(groups);
  const winner = ranked[0];

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Sound & Suspense timer
    soundManager.playClick();
    const timer = setTimeout(() => {
      setRevealed(true);
      soundManager.playCelebrationFanfare();

      // Confetti burst
      const duration = 4 * 1000;
      const end = Date.now() + duration;
      const colors = ['#8A1538', '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#FCD34D'];

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.6 },
          colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.6 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToLeaderboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجدول الترتيب</span>
        </button>
      </div>

      {/* Main Ceremony Card */}
      <div
        id="winner-ceremony-card"
        className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-400 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Decorative Qatari top ribbon */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#8A1538] via-amber-400 to-[#8A1538]" />

        {/* Mascot */}
        <div className="flex flex-col items-center justify-center my-2">
          <motion.div
            animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-white p-1 mb-2"
          >
            <img
              src={mascotImage}
              alt="صديقكم حمد"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          {/* Grand Header */}
          <h2 className="text-3xl sm:text-5xl font-black text-[#8A1538] flex items-center justify-center gap-2 mb-2">
            <span>🏆</span>
            <span>أبطال الرياضيات</span>
            <span>🏆</span>
          </h2>

          <p className="text-slate-600 font-bold text-base sm:text-xl">
            «الفائز في تحدي أوجد ناتج الضرب هو...»
          </p>
        </div>

        {/* Suspense vs Reveal State */}
        <div className="min-h-[260px] flex items-center justify-center my-4">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="suspense"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-3 p-8"
              >
                <div className="w-20 h-20 rounded-full border-4 border-amber-400 border-t-[#8A1538] animate-spin flex items-center justify-center text-2xl shadow-lg">
                  ⏳
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-600 animate-pulse">
                  جاري حساب النتائج بدقة... 🥁
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="winner"
                initial={{ scale: 0.5, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-full max-w-lg bg-gradient-to-br from-amber-50 via-white to-amber-100 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl"
              >
                {/* 1st Place Golden Banner */}
                <div className="inline-block bg-amber-400 text-[#8A1538] font-black text-sm sm:text-base px-5 py-1.5 rounded-full shadow-sm mb-3">
                  🥇 المركز الأول في التحدي 🥇
                </div>

                {/* Winning Group Title */}
                <div className="text-3xl sm:text-5xl font-black text-slate-900 my-2 flex items-center justify-center gap-2">
                  <span>{winner.colorTheme.emoji}</span>
                  <span>{winner.name}</span>
                </div>

                {/* Score & Time Highlight */}
                <div className="flex items-center justify-center gap-4 my-4 bg-white/90 py-3 px-6 rounded-2xl border-2 border-amber-300 shadow-xs">
                  <div className="text-center">
                    <span className="text-xs text-slate-500 font-bold block">الدقة</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#8A1538]" dir="ltr">
                      {winner.score} / 4
                    </span>
                  </div>
                  <span className="text-slate-300 text-2xl">|</span>
                  <div className="text-center">
                    <span className="text-xs text-slate-500 font-bold block">الزمن</span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-slate-800" dir="ltr">
                      {formatSecondsToMMSS(winner.timeTakenSeconds)}
                    </span>
                  </div>
                </div>

                {/* 4 Stars Display */}
                <div className="flex justify-center gap-1.5 my-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        i < winner.score
                          ? 'fill-amber-400 text-amber-500 drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Winning Students */}
                <div className="mt-4 pt-3 border-t border-amber-200 text-right">
                  <span className="text-xs font-black text-slate-500 block mb-1">
                    أعضاء المجموعة الفائزة:
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {winner.students.map((student, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-300"
                      >
                        🏅 {student}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Required collaborative & encouraging note */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="my-4"
          >
            <div className="text-2xl sm:text-3xl font-black text-[#8A1538] my-1">
              «أحسنتم جميعًا! 👏»
            </div>
            <p className="text-slate-600 font-semibold text-sm sm:text-base max-w-md mx-auto">
              فخورون بجميع المجموعات الخمس لتعاونهم وإتقانهم لحقائق الضرب. كل طالب مشارك هو بطل في مادة الرياضيات! 🌟
            </p>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToLeaderboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#8A1538] hover:bg-[#72102e] text-white font-black text-base shadow-md cursor-pointer transition-all active:scale-95"
          >
            عرض جدول الترتيب الكامل 📊
          </button>

          <button
            type="button"
            onClick={onResetChallenge}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base cursor-pointer transition-colors"
          >
            إعادة التحدي 🔄
          </button>
        </div>
      </div>
    </div>
  );
};
