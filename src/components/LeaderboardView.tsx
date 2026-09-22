import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Clock, Users, ArrowRight, Sparkles, Award } from 'lucide-react';
import { StudentGroup } from '../types';
import { rankGroups, formatSecondsToMMSS } from '../data/groups';

interface LeaderboardViewProps {
  groups: StudentGroup[];
  onAnnounceWinner: () => void;
  onBackToGroups: () => void;
  onPlayGroup: (groupId: number) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  groups,
  onAnnounceWinner,
  onBackToGroups,
  onPlayGroup,
}) => {
  // Rank groups strictly: 1. Score descending, 2. Time taken ascending
  const ranked = rankGroups(groups);
  const completedCount = groups.filter((g) => g.status === 'completed').length;
  const allCompleted = completedCount === groups.length;

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border-2 border-amber-400 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
          <span className="text-lg">🥇</span>
          <span>المركز الأول</span>
        </span>
      );
    }
    if (index === 1) {
      return (
        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
          <span className="text-lg">🥈</span>
          <span>المركز الثاني</span>
        </span>
      );
    }
    if (index === 2) {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border-2 border-amber-300 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
          <span className="text-lg">🥉</span>
          <span>المركز الثالث</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 font-bold text-xs px-2.5 py-1 rounded-full border border-slate-200">
        <span>المركز {index + 1}</span>
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToGroups}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة المجموعات</span>
        </button>

        <div className="text-xs sm:text-sm font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          تم إنهاء: <span className="text-[#8A1538] font-black">{completedCount}</span> من 5 مجموعات
        </div>
      </div>

      {/* Main Leaderboard Card */}
      <div
        id="leaderboard-table-card"
        className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-[#8A1538] flex items-center justify-center mx-auto mb-2 text-3xl shadow-md">
            🏆
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#8A1538]">
            تحدي أوجد ناتج الضرب
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-bold mt-1">
            جدول الترتيب والمنافسة الجماعية لطلاب الصف الثالث الابتدائي
          </p>

          {/* Explicit rule reminder banner */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-900 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>قاعدة التقييم المعتمدة: أولاً الدقة (عدد الإجابات الصحيحة من 4) ثم ثانياً السرعة (أقل زمن مستغرق)</span>
          </div>
        </div>

        {/* Grand Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-xs mb-6">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#8A1538] to-[#70102d] text-white text-xs sm:text-sm font-black">
                <th className="py-3.5 px-3 sm:px-4 text-center">المركز</th>
                <th className="py-3.5 px-3 sm:px-4">المجموعة</th>
                <th className="py-3.5 px-3 sm:px-4 text-center">النتيجة (الدقة)</th>
                <th className="py-3.5 px-3 sm:px-4 text-center">الوقت (السرعة)</th>
                <th className="py-3.5 px-3 sm:px-4 text-center">النجوم</th>
                <th className="py-3.5 px-3 sm:px-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm font-bold text-slate-800">
              {ranked.map((group, index) => {
                const isCompleted = group.status === 'completed';
                const isTop1 = index === 0 && isCompleted;

                return (
                  <tr
                    key={group.id}
                    className={`transition-colors ${
                      isTop1
                        ? 'bg-amber-50/70 hover:bg-amber-100/50'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-slate-50/50 hover:bg-slate-100/60'
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                      {isCompleted ? getRankBadge(index) : (
                        <span className="text-xs text-slate-400 font-semibold">—</span>
                      )}
                    </td>

                    {/* Group Name & Students */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">{group.colorTheme.emoji}</span>
                        <div>
                          <div className="font-black text-slate-900 text-sm sm:text-base">
                            {group.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal">
                            الطلاب: {group.students.slice(0, 3).join('، ')}
                            {group.students.length > 3 ? '...' : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Score (الدقة) */}
                    <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                      {isCompleted ? (
                        <span className="inline-block bg-[#8A1538]/10 text-[#8A1538] px-2.5 py-1 rounded-xl font-black text-base" dir="ltr">
                          {group.score} / 4
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">لم تلعب بعد</span>
                      )}
                    </td>

                    {/* Time (السرعة) */}
                    <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                      {isCompleted ? (
                        <span className="font-mono font-black text-slate-800 text-base" dir="ltr">
                          {formatSecondsToMMSS(group.timeTakenSeconds)}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs">--:--</span>
                      )}
                    </td>

                    {/* Stars */}
                    <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                      {isCompleted ? (
                        <span className="text-amber-500 tracking-wider">
                          {'⭐'.repeat(group.score)}
                          {'☆'.repeat(4 - group.score)}
                        </span>
                      ) : (
                        <span className="text-slate-300">☆☆☆☆</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3 sm:px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onPlayGroup(group.id)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                      >
                        {isCompleted ? 'إعادة' : 'بدء'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Winner Announcement CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            id="announce-winner-btn"
            onClick={onAnnounceWinner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xl shadow-lg cursor-pointer transition-all min-w-[240px]"
          >
            <Trophy className="w-6 h-6 animate-bounce" />
            <span>إعلان بطل التحدي والتتويج 🏆</span>
          </motion.button>

          <button
            type="button"
            onClick={onBackToGroups}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base cursor-pointer transition-colors"
          >
            متابعة تحدي باقي المجموعات
          </button>
        </div>
      </div>
    </div>
  );
};
