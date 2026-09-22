import React, { useState } from 'react';
import { Users, Plus, Trash2, ArrowRight, Play, Sparkles, Check } from 'lucide-react';
import { StudentGroup } from '../types';

interface GroupSetupViewProps {
  group: StudentGroup;
  onSaveAndStart: (updatedStudents: string[]) => void;
  onBack: () => void;
}

export const GroupSetupView: React.FC<GroupSetupViewProps> = ({
  group,
  onSaveAndStart,
  onBack,
}) => {
  // Ensure we have at least 6 student slots
  const initialList = [...group.students];
  while (initialList.length < 6) {
    initialList.push('');
  }

  const [studentNames, setStudentNames] = useState<string[]>(initialList);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNameChange = (index: number, val: string) => {
    const updated = [...studentNames];
    updated[index] = val;
    setStudentNames(updated);
    if (errorMsg) setErrorMsg(null);
  };

  const handleAddStudent = () => {
    if (studentNames.length >= 10) return;
    setStudentNames([...studentNames, '']);
  };

  const handleRemoveStudent = (index: number) => {
    if (studentNames.length <= 2) return;
    setStudentNames(studentNames.filter((_, idx) => idx !== index));
  };

  const handleFillSample = () => {
    const sampleNames = [
      ['حمد الكواري', 'راشد المري', 'تميم الهاجري', 'جاسم النعيمي', 'سالم المنصوري', 'علي المهندي'],
      ['خالد السليطي', 'عبدالله السويدي', 'فيصل القحطاني', 'سلطان الدوسري', 'محمد الكعبي', 'سعود فخرو'],
      ['فهد الخاطر', 'عمر العطية', 'سعد الشهواني', 'يوسف الباكر', 'خليفة المناعي', 'تركي المالكي'],
      ['ناصر آل ثاني', 'غانم المعاضيد', 'أحمد الخليفي', 'منصور الكبيسي', 'هزاع المسند', 'سيف العذبة'],
      ['مبارك الخيارين', 'طلال المفتاح', 'زايد الحبابي', 'عيسى الهيدوس', 'شاهين المريخي', 'بدر الشمري'],
    ];
    const groupSamples = sampleNames[(group.id - 1) % sampleNames.length];
    setStudentNames([...groupSamples]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty names or auto-name
    const validNames = studentNames
      .map((name, idx) => name.trim() || `الطالب ${idx + 1}`)
      .filter((n) => n.length > 0);

    if (validNames.length === 0) {
      setErrorMsg('يرجى إدخال اسم طالب واحد على الأقل للمجموعة.');
      return;
    }

    onSaveAndStart(validNames);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>رجوع لاختيار المجموعة</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-2xl">{group.colorTheme.emoji}</span>
          <span className="font-black text-xl text-slate-900">{group.name}</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div
        id="group-setup-card"
        className={`bg-white rounded-3xl p-6 sm:p-8 border-3 ${group.colorTheme.borderColor} shadow-xl relative overflow-hidden`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold mb-1 bg-amber-100 text-amber-900">
              <Users className="w-3.5 h-3.5" />
              <span>إعداد أسماء الطلاب</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              أدخل أسماء طلاب {group.name}
            </h3>
            <p className="text-slate-500 text-sm font-semibold mt-0.5">
              يمكن للمعلم كتابة الأسماء يدوياً أو تعديلها بسهولة عبر شاشة اللمس
            </p>
          </div>

          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>تعبئة أسماء تلقائية</span>
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-300 text-sm font-bold mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {studentNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200 focus-within:border-[#8A1538] focus-within:ring-2 focus-within:ring-[#8A1538]/10 transition-all"
              >
                <span className="w-16 text-xs font-black text-slate-500 flex-shrink-0 text-center bg-white py-1 px-1.5 rounded-lg border border-slate-200">
                  الطالب {index + 1}:
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`اسم الطالب ${index + 1}`}
                  className="flex-1 bg-transparent border-none text-slate-800 font-bold text-sm sm:text-base focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
                {studentNames.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(index)}
                    aria-label="حذف"
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add extra student button */}
          {studentNames.length < 10 && (
            <div className="flex justify-center mt-1">
              <button
                type="button"
                onClick={handleAddStudent}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة طالب إضافي للمجموعة</span>
              </button>
            </div>
          )}

          {/* Big Start Challenge CTA (as required in prompt) */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-semibold text-center sm:text-right">
              سيتم حفظ الأسماء لهذه الجلسة وربطها بنتيجة المجموعة في جدول الترتيب.
            </div>

            <button
              type="submit"
              id="start-challenge-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#8A1538] hover:bg-[#70102d] active:scale-95 text-white font-black text-xl shadow-xl transition-all cursor-pointer min-w-[220px]"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>ابدأ التحدي 🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
