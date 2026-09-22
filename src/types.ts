export interface Question {
  id: number;
  factor1: number;
  factor2: number;
  equation: string;
  correctAnswer: number;
  options: number[];
  hint: string;
  ruleExplanation: string;
}

export interface GroupColorTheme {
  name: string;
  emoji: string;
  primary: string; // e.g. '#2563EB'
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
}

export interface StudentGroup {
  id: number;
  name: string;
  colorTheme: GroupColorTheme;
  students: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  score: number; // 0 to 4
  timeTakenSeconds: number; // in seconds (e.g. 71 for 01:11)
  completedAt?: number;
}

export type AppView = 
  | 'group_selection'  // Main screen: choose or setup a group
  | 'group_setup'      // Edit students in a group
  | 'group_ready'      // "Are you ready?" pre-challenge screen
  | 'playing'          // The 4 questions quiz
  | 'group_result'     // Group victory & Entrance ticket
  | 'leaderboard'      // All 5 groups ranking table
  | 'winner_ceremony'; // Grand final winner announcement
