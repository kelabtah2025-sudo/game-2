import { StudentGroup } from '../types';

export const INITIAL_GROUPS: StudentGroup[] = [
  {
    id: 1,
    name: 'المجموعة 1',
    colorTheme: {
      name: 'الأزرق',
      emoji: '🟦',
      primary: '#2563EB',
      bgGradient: 'from-blue-500 to-indigo-600',
      cardBg: 'bg-blue-50/70',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-700',
      badgeBg: 'bg-blue-100 text-blue-800',
    },
    students: ['حمد الكواري', 'راشد المري', 'تميم الهاجري', 'جاسم النعيمي', 'سالم المنصوري', 'علي المهندي'],
    status: 'not_started',
    score: 0,
    timeTakenSeconds: 0,
  },
  {
    id: 2,
    name: 'المجموعة 2',
    colorTheme: {
      name: 'الأخضر',
      emoji: '🟩',
      primary: '#059669',
      bgGradient: 'from-emerald-500 to-teal-600',
      cardBg: 'bg-emerald-50/70',
      borderColor: 'border-emerald-400',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
    students: ['خالد السليطي', 'عبدالله السويدي', 'فيصل القحطاني', 'سلطان الدوسري', 'محمد الكعبي', 'سعود فخرو'],
    status: 'not_started',
    score: 0,
    timeTakenSeconds: 0,
  },
  {
    id: 3,
    name: 'المجموعة 3',
    colorTheme: {
      name: 'الأصفر',
      emoji: '🟨',
      primary: '#D97706',
      bgGradient: 'from-amber-500 to-yellow-600',
      cardBg: 'bg-amber-50/70',
      borderColor: 'border-amber-400',
      textColor: 'text-amber-800',
      badgeBg: 'bg-amber-100 text-amber-900',
    },
    students: ['فهد الخاطر', 'عمر العطية', 'سعد الشهواني', 'يوسف الباكر', 'خليفة المناعي', 'تركي المالكي'],
    status: 'not_started',
    score: 0,
    timeTakenSeconds: 0,
  },
  {
    id: 4,
    name: 'المجموعة 4',
    colorTheme: {
      name: 'الأدعم القطري',
      emoji: '🟥',
      primary: '#8A1538',
      bgGradient: 'from-[#8A1538] to-[#670D28]',
      cardBg: 'bg-rose-50/70',
      borderColor: 'border-[#8A1538]',
      textColor: 'text-[#8A1538]',
      badgeBg: 'bg-[#8A1538]/10 text-[#8A1538]',
    },
    students: ['ناصر آل ثاني', 'غانم المعاضيد', 'أحمد الخليفي', 'منصور الكبيسي', 'هزاع المسند', 'سيف العذبة'],
    status: 'not_started',
    score: 0,
    timeTakenSeconds: 0,
  },
  {
    id: 5,
    name: 'المجموعة 5',
    colorTheme: {
      name: 'البنفسجي',
      emoji: '🟪',
      primary: '#7C3AED',
      bgGradient: 'from-purple-500 to-violet-600',
      cardBg: 'bg-purple-50/70',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-700',
      badgeBg: 'bg-purple-100 text-purple-800',
    },
    students: ['مبارك الخيارين', 'طلال المفتاح', 'زايد الحبابي', 'عيسى الهيدوس', 'شاهين المريخي', 'بدر الشمري'],
    status: 'not_started',
    score: 0,
    timeTakenSeconds: 0,
  },
];

export const formatSecondsToMMSS = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Strict evaluation rule:
 * 1. Accuracy first: Higher score (correct answers out of 4) ranks higher.
 * 2. Speed second: Among equal scores, lower time taken ranks higher.
 */
export const rankGroups = (groups: StudentGroup[]): StudentGroup[] => {
  return [...groups].sort((a, b) => {
    // 1. Score descending
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2. Time taken ascending (faster is better)
    // Only compare time if they attempted
    if (a.status === 'completed' && b.status === 'completed') {
      return a.timeTakenSeconds - b.timeTakenSeconds;
    }
    if (a.status === 'completed') return -1;
    if (b.status === 'completed') return 1;
    return 0;
  });
};
