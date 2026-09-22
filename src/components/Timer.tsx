import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface TimerProps {
  seconds: number;
}

export const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  const isLowTime = seconds <= 30;
  const isCritical = seconds <= 10;

  return (
    <div
      id="quiz-timer"
      aria-label={`المؤقت: ${formattedTime}`}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl shadow-sm border-2 transition-all duration-300 ${
        isCritical
          ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse scale-105'
          : isLowTime
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-white/95 border-amber-200 text-slate-800'
      }`}
    >
      {isCritical ? (
        <AlertCircle className="w-6 h-6 text-rose-600 animate-bounce" />
      ) : (
        <Clock className={`w-6 h-6 ${isLowTime ? 'text-amber-500' : 'text-[#8A1538]'}`} />
      )}
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold text-slate-500 leading-none">المؤقت</span>
        <span className="font-mono text-2xl font-black tracking-wider leading-tight" dir="ltr">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
