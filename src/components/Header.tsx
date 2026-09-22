import React from 'react';
import { Volume2, VolumeX, Settings, Trophy, Sparkles, Home } from 'lucide-react';
import { Timer } from './Timer';
import { StudentGroup, AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  activeGroup: StudentGroup | null;
  timerSeconds: number;
  isTimerActive: boolean;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenTeacherPanel: () => void;
  onViewLeaderboard: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  activeGroup,
  timerSeconds,
  isTimerActive,
  isMuted,
  onToggleSound,
  onOpenTeacherPanel,
  onViewLeaderboard,
  onGoHome,
}) => {
  return (
    <header
      id="app-header"
      className="relative bg-gradient-to-r from-[#8A1538] via-[#74102e] to-[#8A1538] text-white shadow-md rounded-b-3xl overflow-hidden"
    >
      {/* Decorative top gold serrated line inspired by Qatar heritage */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-400 opacity-90" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5">
        {/* Top school ministry line */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2 mb-2.5 text-xs sm:text-sm font-medium text-amber-100/90">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>دولة قطر • وزارة التربية والتعليم والتعليم العالي</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-xs text-white">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>مادة الرياضيات • الصف الثالث الابتدائي</span>
          </div>
        </div>

        {/* Main Header bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Title and Active Group badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onGoHome}>
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-[#8A1538] flex items-center justify-center font-black text-2xl shadow-inner flex-shrink-0">
              🎫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow-xs">
                  أوجد ناتج الضرب
                </span>
                {activeGroup && currentView === 'playing' && (
                  <span className="bg-white/20 text-white text-xs font-black px-2.5 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
                    <span>{activeGroup.colorTheme.emoji}</span>
                    <span>{activeGroup.name}</span>
                  </span>
                )}
              </div>
              <span className="text-amber-200/90 text-xs font-bold block">
                تحدي المجموعات التفاعلي للسبورة الذكية
              </span>
            </div>
          </div>

          {/* Centered Timer if playing */}
          {isTimerActive && (
            <div className="my-1 sm:my-0">
              <Timer seconds={timerSeconds} />
            </div>
          )}

          {/* Teacher and Classroom Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Go Home button */}
            {currentView !== 'group_selection' && (
              <button
                type="button"
                onClick={onGoHome}
                aria-label="الرئيسية"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white transition-all shadow-sm focus:outline-none flex items-center gap-1 text-xs font-bold cursor-pointer"
                title="الرئيسية / اختيار المجموعة"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">المجموعات</span>
              </button>
            )}

            {/* Leaderboard button */}
            <button
              type="button"
              onClick={onViewLeaderboard}
              aria-label="جدول النتائج"
              className={`p-2.5 rounded-xl border transition-all shadow-sm focus:outline-none flex items-center gap-1 text-xs font-bold cursor-pointer ${
                currentView === 'leaderboard'
                  ? 'bg-amber-400 text-[#8A1538] border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="جدول النتائج والتتويج"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">النتائج</span>
            </button>

            {/* ⚙️ Teacher Panel Button (as requested in prompt) */}
            <button
              type="button"
              id="teacher-panel-btn"
              onClick={onOpenTeacherPanel}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#8A1538] font-black text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="لوحة تحكم المعلم"
            >
              <Settings className="w-4 h-4" />
              <span>⚙️ لوحة المعلم</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              id="sound-toggle-btn"
              onClick={onToggleSound}
              aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white transition-all shadow-sm cursor-pointer"
              title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
