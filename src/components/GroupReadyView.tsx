import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Clock, Award, Users, Sparkles } from 'lucide-react';
import { StudentGroup } from '../types';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface GroupReadyViewProps {
  group: StudentGroup;
  onStart: () => void;
  onBack: () => void;
}

export const GroupReadyView: React.FC<GroupReadyViewProps> = ({
  group,
  onStart,
  onBack,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>تغيير المجموعة أو الأسماء</span>
        </button>
      </div>

      {/* Main Ready Card */}
      <div
        id="ready-card"
        className={`bg-white rounded-3xl p-6 sm:p-10 border-4 ${group.colorTheme.borderColor} shadow-2xl text-center relative overflow-hidden`}
      >
        {/* Top Decorative Banner */}
        <div className={`absolute top-0 inset-x-0 h-4 bg-gradient-to-r ${group.colorTheme.bgGradient}`} />

        {/* Mascot & Encouragement */}
        <div className="flex flex-col items-center justify-center my-3">
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-white p-1 mb-4"
          >
            <img
              src={mascotImage}
              alt="صديقكم حمد"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          <div className="flex items-center gap-2 text-3xl sm:text-4xl font-black text-slate-900 mb-1">
            <span>{group.colorTheme.emoji}</span>
            <span>{group.name}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#8A1538] my-2">
            هل أنتم مستعدون؟ 🎯
          </h2>

          <div className="max-w-lg bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 my-3 text-slate-700 font-bold text-base sm:text-lg leading-relaxed shadow-sm">
            «أهلاً بأبطال {group.name}! لديكم <span className="text-[#8A1538] font-black">دقيقتان (02:00)</span> لحل 4 مسائل في جدول الضرب. تعاونوا معاً باللمس والنقر، وتذكروا: <span className="text-emerald-700 font-black">الدقة أولاً ثم السرعة!</span>»
          </div>
        </div>

        {/* Student Team Roster */}
        <div className="my-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-right">
          <div className="flex items-center gap-2 text-xs font-black text-slate-500 mb-2">
            <Users className="w-4 h-4 text-[#8A1538]" />
            <span>فريق {group.name} المشارك ({group.students.length} طلاب):</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {group.students.map((student, i) => (
              <span
                key={i}
                className="bg-white text-slate-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-xl border border-slate-300 shadow-2xs"
              >
                ⭐ {student}
              </span>
            ))}
          </div>
        </div>

        {/* Big Start Button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            id="ready-start-btn"
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-3xl bg-[#8A1538] hover:bg-[#72102e] text-white font-black text-2xl sm:text-3xl shadow-xl hover:shadow-2xl cursor-pointer min-w-[280px]"
          >
            <Play className="w-8 h-8 fill-current animate-pulse" />
            <span>ابدأ التحدي 🚀</span>
          </motion.button>

          <span className="text-xs text-slate-400 font-semibold">
            يبدأ المؤقت التنازلي (02:00) فور الضغط على الزر
          </span>
        </div>
      </div>
    </div>
  );
};
