import React, { useState } from 'react';
import { X, RotateCcw, Users, Trophy, Play, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { StudentGroup } from '../types';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: StudentGroup[];
  onSelectGroup: (groupId: number) => void;
  onEditGroup: (groupId: number) => void;
  onResetAll: () => void;
  onViewLeaderboard: () => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  groups,
  onSelectGroup,
  onEditGroup,
  onResetAll,
  onViewLeaderboard,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="teacher-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="teacher-modal-content"
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-4 border-[#8A1538] overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8A1538] via-[#74102e] to-[#8A1538] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#8A1538] flex items-center justify-center font-black text-xl shadow-inner">
              ⚙️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">لوحة تحكم المعلّم</h2>
              <p className="text-amber-200/90 text-xs sm:text-sm">إدارة المجموعات، النتائج، وتوجيه التحدي الصفّي</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewLeaderboard();
              }}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-sm transition-all cursor-pointer"
            >
              <Trophy className="w-5 h-5" />
              <span>عرض جدول النتائج والتتويج 🏆</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center justify-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 font-black text-base shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-rose-600" />
              <span>إعادة ضبط التحدي بالكامل ⚠️</span>
            </button>
          </div>

          {/* Reset Confirmation Dialog */}
          {showConfirmReset && (
            <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 text-center animate-fadeIn">
              <div className="flex items-center justify-center gap-2 text-rose-800 font-black text-lg mb-2">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
                <span>هل أنت متأكد من رغبتك في إعادة ضبط التحدي؟</span>
              </div>
              <p className="text-slate-600 text-sm mb-4 font-medium">
                سيؤدي هذا إلى مسح نتائج جميع المجموعات وأوقاتهم المسجلة في هذه الجلسة.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onResetAll();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow cursor-pointer"
                >
                  نعم، أعد ضبط النتائج
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}

          {/* Groups Status List */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8A1538]" />
              <span>حالة المجموعات الخمس (5)</span>
            </h3>

            <div className="space-y-3">
              {groups.map((group) => {
                const isDone = group.status === 'completed';
                const mins = Math.floor(group.timeTakenSeconds / 60);
                const secs = group.timeTakenSeconds % 60;
                const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

                return (
                  <div
                    key={group.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${group.colorTheme.cardBg} ${group.colorTheme.borderColor}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.colorTheme.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-base">{group.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${group.colorTheme.badgeBg}`}>
                            {isDone ? 'مكتمل ✅' : 'لم تبدأ بعد ⏳'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 font-medium">
                          الطلاب ({group.students.length}): {group.students.slice(0, 3).join('، ')}
                          {group.students.length > 3 ? '...' : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {isDone && (
                        <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-black text-slate-800 text-center ml-2">
                          <span className="text-[#8A1538]">{group.score} / 4</span>
                          <span className="mx-1.5 text-slate-300">|</span>
                          <span className="font-mono text-slate-600" dir="ltr">{formattedTime}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onEditGroup(group.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs cursor-pointer"
                      >
                        تعديل الأسماء
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectGroup(group.id);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#8A1538] hover:bg-[#72102e] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isDone ? 'إعادة التحدي' : 'بدء التحدي'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
