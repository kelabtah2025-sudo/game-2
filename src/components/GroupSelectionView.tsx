import React from 'react';
import { motion } from 'motion/react';
import { Play, Users, Edit3, Trophy, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { StudentGroup } from '../types';
import { formatSecondsToMMSS } from '../data/groups';
import mascotImage from '../assets/images/qatari_student_mascot_1790068791121.jpg';

interface GroupSelectionViewProps {
  groups: StudentGroup[];
  onSelectGroup: (groupId: number) => void;
  onEditGroup: (groupId: number) => void;
  onViewLeaderboard: () => void;
  onOpenTeacherPanel: () => void;
}

export const GroupSelectionView: React.FC<GroupSelectionViewProps> = ({
  groups,
  onSelectGroup,
  onEditGroup,
  onViewLeaderboard,
  onOpenTeacherPanel,
}) => {
  const completedCount = groups.filter((g) => g.status === 'completed').length;

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Welcome Banner with Mascot */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 border-3 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-amber-400 shadow-md bg-white p-1 flex-shrink-0">
            <img
              src={mascotImage}
              alt="صديقكم حمد"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A1538]/10 text-[#8A1538] text-xs font-bold mb-1 border border-[#8A1538]/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>تحدي الرياضيات الجماعي • الصف الثالث الابتدائي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              مرحباً بكم في تحدي «أوجد ناتج الضرب»! 🎫
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-semibold mt-1">
              اختر مجموعتك لبدء التحدي. الدقة أولاً (4 / 4) ثم السرعة في دقيقتين (02:00) للفوز بالمركز الأول!
            </p>
          </div>
        </div>

        {/* Global Progress & Leaderboard Quick CTA */}
        <div className="flex flex-col items-center sm:items-end gap-2.5 flex-shrink-0 w-full sm:w-auto">
          <div className="bg-white/90 border border-amber-200 px-4 py-2 rounded-2xl shadow-2xs text-center w-full sm:w-auto">
            <div className="text-xs text-slate-500 font-bold">التقدم الإجمالي للتحدي</div>
            <div className="text-lg font-black text-[#8A1538]">
              تم إنجاز <span className="text-2xl text-amber-600">{completedCount}</span> من 5 مجموعات
            </div>
          </div>

          <button
            type="button"
            onClick={onViewLeaderboard}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>عرض جدول الترتيب 🏆</span>
          </button>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="text-center my-1">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          اختر مجموعتك
        </h3>
        <p className="text-slate-500 font-bold text-sm sm:text-base mt-1">
          اضغط على زر «ابدأ التحدي» للمجموعة المستعدة، أو «تعديل الأسماء» لتحديث قائمة الطلاب
        </p>
      </div>

      {/* 5 Big Group Cards for Smartboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((group, index) => {
          const isDone = group.status === 'completed';
          const isAllCorrect = group.score === 4;

          return (
            <motion.div
              key={group.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-3xl p-5 sm:p-6 border-3 shadow-md flex flex-col justify-between transition-all duration-200 ${group.colorTheme.cardBg} ${group.colorTheme.borderColor}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl filter drop-shadow-sm">{group.colorTheme.emoji}</span>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                        {group.name}
                      </h4>
                      <span className="text-xs font-bold text-slate-500">
                        الفريق {group.colorTheme.name}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مكتمل</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>في الانتظار</span>
                    </span>
                  )}
                </div>

                {/* Score & Time if completed */}
                {isDone ? (
                  <div className="bg-white/95 rounded-2xl p-3 border border-slate-200 shadow-2xs my-3 text-center">
                    <div className="text-xs text-slate-500 font-bold mb-1">النتيجة والوقت المستغرق:</div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-lg font-black text-[#8A1538]">
                        {group.score} / 4
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="text-lg font-black font-mono text-slate-800" dir="ltr">
                        {formatSecondsToMMSS(group.timeTakenSeconds)}
                      </div>
                      <span className="text-slate-300">|</span>
                      <div className="text-amber-500 text-base">
                        {'⭐'.repeat(group.score)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/60 rounded-2xl p-3 border border-slate-200/80 my-3 text-center">
                    <span className="text-xs text-slate-500 font-bold">
                      المسألة: 4 مسائل • المدة: دقيقتان (02:00)
                    </span>
                  </div>
                )}

                {/* Students Names Preview */}
                <div className="my-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>أعضاء المجموعة ({group.students.length} طلاب):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onEditGroup(group.id)}
                      className="text-[#8A1538] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {group.students.map((student, idx) => (
                      <span
                        key={idx}
                        className="bg-white/90 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        {student}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Big Action Buttons (Smartboard friendly) */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col gap-2">
                <button
                  type="button"
                  id={`start-group-btn-${group.id}`}
                  onClick={() => onSelectGroup(group.id)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-white ${
                    isDone
                      ? 'bg-slate-700 hover:bg-slate-800'
                      : 'bg-[#8A1538] hover:bg-[#70102d]'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{isDone ? 'إعادة التحدي 🔄' : 'ابدأ التحدي 🚀'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onEditGroup(group.id)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-amber-50 text-slate-700 text-xs font-bold border border-slate-300 transition-colors cursor-pointer text-center"
                >
                  تعديل أسماء الطلاب ✏️
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
