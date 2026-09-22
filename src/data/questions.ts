import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    factor1: 1,
    factor2: 8,
    equation: '1 × 8 = ؟',
    correctAnswer: 8,
    // Options: 8, 7, 9 as requested in prompt example
    options: [8, 7, 9],
    hint: 'خاصية العنصر المحايد: أي عدد نضربه في 1 يبقى كما هو دون تغيير!',
    ruleExplanation: '1 × 8 = 8 (ثمانية واحدة فقط)',
  },
  {
    id: 2,
    factor1: 0,
    factor2: 4,
    equation: '0 × 4 = ؟',
    correctAnswer: 0,
    options: [0, 4, 40],
    hint: 'خاصية الضرب في صفر: الصفر يمتص أي عدد يُضرب فيه، والناتج دائمًا 0!',
    ruleExplanation: '0 × 4 = 0 (لا يوجد أي مجموعات)',
  },
  {
    id: 3,
    factor1: 9,
    factor2: 10,
    equation: '9 × 10 = ؟',
    correctAnswer: 90,
    options: [90, 19, 900],
    hint: 'الضرب في 10: 9 عشرات تعني إضافة صفر إلى يمين العدد 9!',
    ruleExplanation: '9 × 10 = 90 (تسع عشرات كاملة)',
  },
  {
    id: 4,
    factor1: 2,
    factor2: 7,
    equation: '2 × 7 = ؟',
    correctAnswer: 14,
    options: [14, 9, 16],
    hint: 'الضرب في 2 يعني مضاعفة العدد 7 (7 + 7)!',
    ruleExplanation: '2 × 7 = 14 (مضاعف العدد 7)',
  },
];
