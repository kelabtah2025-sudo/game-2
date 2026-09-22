import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, RotateCcw, CheckCircle2, Ticket, Award, Calendar, School } from 'lucide-react';
import { motion } from 'motion/react';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface CelebrationModalProps {
  score: number;
  starsCount: number;
  timeSpentSeconds: number;
  onRestart: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  score,
  starsCount,
  timeSpentSeconds,
  onRestart,
}) => {
  useEffect(() => {
    // Launch celebratory confetti sequence
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    // Qatari maroon & celebratory gold palette
    const colors = ['#8A1538', '#F59E0B', '#10B981', '#FFFFFF', '#FCD34D'];

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
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };

  return (
    <motion.div
      id="celebration-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center relative overflow-hidden"
    >
      {/* Decorative Qatari top banner */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#8A1538] via-[#a31a43] to-[#8A1538]" />

      {/* Mascot and Stars */}
      <div className="flex flex-col items-center justify-center mt-2 mb-4">
        <motion.div
          animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-white p-1 mb-3"
        >
          <img
            src={mascotImage}
            alt="الطالب المتميز"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* 4 Golden Stars ⭐⭐⭐⭐ */}
        <div className="flex items-center justify-center gap-2 my-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 200 }}
            >
              <Star className="w-9 h-9 sm:w-11 sm:h-11 fill-amber-400 text-amber-500 drop-shadow-[0_4px_8px_rgba(245,158,11,0.5)]" />
            </motion.div>
          ))}
        </div>

        {/* The required exact celebration headline */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl sm:text-4xl font-black text-[#8A1538] mt-2 mb-1"
        >
          رائع! لقد حصلت على بطاقة الدخول 🎫
        </motion.h2>

        <p className="text-slate-600 font-bold text-base sm:text-lg mb-6">
          أحسنت صنعاً! لقد أجبت عن جميع مسائل الضرب الأربع بنجاح وتفوق.
        </p>
      </div>

      {/* The Printable / Visual Entrance Ticket (بطاقة الدخول) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        id="entrance-ticket"
        className="max-w-xl mx-auto bg-gradient-to-br from-amber-50/90 via-white to-amber-100/50 rounded-2xl p-5 sm:p-6 border-3 border-dashed border-[#8A1538] shadow-md relative text-right mb-8"
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b-2 border-[#8A1538]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-7 h-7 text-[#8A1538]" />
            <div>
              <div className="text-xs font-bold text-[#8A1538]">وزارة التربية والتعليم والتعليم العالي - قطر</div>
              <div className="text-lg font-black text-slate-900">بطاقة الدخول الرسمية (رياضيات)</div>
            </div>
          </div>
          <div className="bg-[#8A1538] text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>مُجتاز بتفوق</span>
          </div>
        </div>

        {/* Ticket Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3 text-sm">
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
            <div className="text-xs text-slate-500 font-medium">الصف الدراسي</div>
            <div className="font-black text-slate-800">الثالث الابتدائي</div>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
            <div className="text-xs text-slate-500 font-medium">النقاط المكتسبة</div>
            <div className="font-black text-[#8A1538] text-base">{score} / 100 نقطة</div>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 font-medium">الوقت المستغرق</div>
            <div className="font-black text-slate-800 font-mono" dir="ltr">
              {formatTime(timeSpentSeconds)}
            </div>
          </div>
        </div>

        {/* Math Facts Certified */}
        <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/70 text-xs font-bold text-amber-900 mt-3 flex items-center justify-between">
          <span>تم إتقان حقائق الضرب: 1×8 ، 0×4 ، 9×10 ، 2×7</span>
          <span className="text-lg">⭐ 4/4</span>
        </div>

        {/* Golden Stamp Watermark */}
        <div className="absolute -bottom-3 -left-2 sm:left-4 rotate-[-12deg] bg-amber-400/90 text-[#8A1538] border-2 border-[#8A1538] px-4 py-1 rounded-xl font-black text-xs shadow-md uppercase tracking-wider">
          ختم المعلم • معتمد 🏅
        </div>
      </motion.div>

      {/* "ابدأ من جديد" Button (Smartboard friendly) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center"
      >
        <button
          id="restart-game-btn"
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-[#8A1538] hover:bg-[#72102e] active:scale-95 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer min-w-[260px] focus:outline-none focus:ring-4 focus:ring-amber-400"
        >
          <RotateCcw className="w-7 h-7 animate-spin-reverse" />
          <span>ابدأ من جديد</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
