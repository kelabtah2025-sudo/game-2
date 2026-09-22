import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentGroup, AppView } from './types';
import { INITIAL_GROUPS } from './data/groups';
import { QUESTIONS } from './data/questions';
import { soundManager } from './utils/audio';

import { Header } from './components/Header';
import { GroupSelectionView } from './components/GroupSelectionView';
import { GroupSetupView } from './components/GroupSetupView';
import { GroupReadyView } from './components/GroupReadyView';
import { ProgressBar } from './components/ProgressBar';
import { MascotCard } from './components/MascotCard';
import { QuestionCard } from './components/QuestionCard';
import { GroupResultView } from './components/GroupResultView';
import { LeaderboardView } from './components/LeaderboardView';
import { WinnerCeremonyView } from './components/WinnerCeremonyView';
import { TeacherModal } from './components/TeacherModal';

const INITIAL_TIMER_SECONDS = 120; // 02:00
const STORAGE_KEY = 'qatar_math_challenge_groups_v1';

export default function App() {
  // Load groups from session storage if present, otherwise default to INITIAL_GROUPS
  const [groups, setGroups] = useState<StudentGroup[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_GROUPS;
  });

  const [currentView, setCurrentView] = useState<AppView>('group_selection');
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  // In-Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(INITIAL_TIMER_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Global settings
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);

  // Sync groups to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    } catch {
      // ignore
    }
  }, [groups]);

  // Active Group object
  const activeGroup = groups.find((g) => g.id === activeGroupId) || null;
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Countdown Timer Effect (02:00)
  useEffect(() => {
    if (!isTimerRunning || currentView !== 'playing' || !activeGroupId) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);

          // Time expired! Record results for current group
          setGroups((currentGroups) =>
            currentGroups.map((g) => {
              if (g.id === activeGroupId) {
                return {
                  ...g,
                  status: 'completed',
                  score: score,
                  timeTakenSeconds: INITIAL_TIMER_SECONDS,
                  completedAt: Date.now(),
                };
              }
              return g;
            })
          );

          // Transition to result
          setCurrentView('group_result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, currentView, activeGroupId, score]);

  // Audio Toggle
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Select group from home screen
  const handleSelectGroup = (groupId: number) => {
    soundManager.playClick();
    setActiveGroupId(groupId);
    setCurrentView('group_ready');
  };

  // Open edit students view for a group
  const handleEditGroup = (groupId: number) => {
    soundManager.playClick();
    setActiveGroupId(groupId);
    setCurrentView('group_setup');
  };

  // Save student names and transition to ready
  const handleSaveStudentsAndStart = (updatedStudents: string[]) => {
    if (!activeGroupId) return;
    soundManager.playClick();

    setGroups((prev) =>
      prev.map((g) => (g.id === activeGroupId ? { ...g, students: updatedStudents } : g))
    );

    setCurrentView('group_ready');
  };

  // Start the actual 02:00 challenge
  const handleStartChallenge = () => {
    soundManager.playClick();
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimerSeconds(INITIAL_TIMER_SECONDS);
    setSelectedAnswer(null);
    setFeedbackStatus('idle');
    setIsTransitioning(false);
    setShowHint(false);
    setIsTimerRunning(true);
    setCurrentView('playing');
  };

  // Handle Question Option click
  const handleSelectOption = (option: number) => {
    if (isTransitioning || currentView !== 'playing' || !activeGroupId) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      // Correct!
      soundManager.playSuccess();
      setFeedbackStatus('correct');
      setIsTransitioning(true);

      const newScore = score + 1;
      setScore(newScore);

      // Advance or finish after a short moment
      setTimeout(() => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          // Next question
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setFeedbackStatus('idle');
          setIsTransitioning(false);
          setShowHint(false);
        } else {
          // Completed all 4 questions!
          setIsTimerRunning(false);
          setIsTransitioning(false);
          const timeSpent = Math.max(1, INITIAL_TIMER_SECONDS - timerSeconds);

          // Update active group in state
          setGroups((prevGroups) =>
            prevGroups.map((g) => {
              if (g.id === activeGroupId) {
                return {
                  ...g,
                  status: 'completed',
                  score: newScore,
                  timeTakenSeconds: timeSpent,
                  completedAt: Date.now(),
                };
              }
              return g;
            })
          );

          setCurrentView('group_result');
          soundManager.playCelebrationFanfare();
        }
      }, 1200);
    } else {
      // Incorrect!
      soundManager.playError();
      setFeedbackStatus('incorrect');
      // Do not advance, do not count points, allow retry
    }
  };

  // Advance to next group
  const handleNextGroup = () => {
    soundManager.playClick();
    // Find next uncompleted group
    const nextGroup = groups.find((g) => g.status !== 'completed');
    if (nextGroup) {
      setActiveGroupId(nextGroup.id);
      setCurrentView('group_ready');
    } else {
      // All groups done -> show leaderboard!
      setCurrentView('leaderboard');
    }
  };

  // Reset entire challenge
  const handleResetChallenge = () => {
    soundManager.playClick();
    setGroups(
      INITIAL_GROUPS.map((g) => ({
        ...g,
        status: 'not_started',
        score: 0,
        timeTakenSeconds: 0,
      }))
    );
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setActiveGroupId(null);
    setIsTimerRunning(false);
    setCurrentView('group_selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-amber-50/25 to-[#F5EFEB] flex flex-col font-['Tajawal',sans-serif] selection:bg-[#8A1538]/20 selection:text-[#8A1538]">
      {/* Top Header with Teacher Panel, Timer, and Sound Toggle */}
      <Header
        currentView={currentView}
        activeGroup={activeGroup}
        timerSeconds={timerSeconds}
        isTimerActive={currentView === 'playing'}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenTeacherPanel={() => setIsTeacherModalOpen(true)}
        onViewLeaderboard={() => setCurrentView('leaderboard')}
        onGoHome={() => setCurrentView('group_selection')}
      />

      {/* Main Classroom View Switcher */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* View 1: Group Selection Hub */}
          {currentView === 'group_selection' && (
            <motion.div
              key="group_selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GroupSelectionView
                groups={groups}
                onSelectGroup={handleSelectGroup}
                onEditGroup={handleEditGroup}
                onViewLeaderboard={() => setCurrentView('leaderboard')}
                onOpenTeacherPanel={() => setIsTeacherModalOpen(true)}
              />
            </motion.div>
          )}

          {/* View 2: Group Setup (Input Student Names) */}
          {currentView === 'group_setup' && activeGroup && (
            <motion.div
              key="group_setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GroupSetupView
                group={activeGroup}
                onSaveAndStart={handleSaveStudentsAndStart}
                onBack={() => setCurrentView('group_selection')}
              />
            </motion.div>
          )}

          {/* View 3: Group Ready Screen ("هل أنتم مستعدون؟") */}
          {currentView === 'group_ready' && activeGroup && (
            <motion.div
              key="group_ready"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <GroupReadyView
                group={activeGroup}
                onStart={handleStartChallenge}
                onBack={() => setCurrentView('group_selection')}
              />
            </motion.div>
          )}

          {/* View 4: Live Playing (4 Questions Sequential) */}
          {currentView === 'playing' && activeGroup && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Progress Bar (1 من 4, Stars, النقاط: X / 4) */}
              <ProgressBar
                currentIndex={currentQuestionIndex}
                totalQuestions={QUESTIONS.length}
                starsCount={score}
                score={score}
                group={activeGroup}
              />

              {/* Qatari Mascot Companion with Speech Bubble */}
              <MascotCard
                feedbackStatus={feedbackStatus}
                hint={currentQuestion.hint}
                showHint={showHint}
                onToggleHint={() => setShowHint((prev) => !prev)}
              />

              {/* Interactive Smartboard Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuestionCard
                    question={currentQuestion}
                    questionIndex={currentQuestionIndex}
                    totalQuestions={QUESTIONS.length}
                    selectedAnswer={selectedAnswer}
                    feedbackStatus={feedbackStatus}
                    isTransitioning={isTransitioning}
                    onSelectOption={handleSelectOption}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* View 5: Group Result & Official Entrance Ticket */}
          {currentView === 'group_result' && activeGroup && (
            <motion.div
              key="group_result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <GroupResultView
                group={activeGroup}
                onNextGroup={handleNextGroup}
                onViewLeaderboard={() => setCurrentView('leaderboard')}
                onBackToGroups={() => setCurrentView('group_selection')}
              />
            </motion.div>
          )}

          {/* View 6: Leaderboard Ranking Table */}
          {currentView === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <LeaderboardView
                groups={groups}
                onAnnounceWinner={() => setCurrentView('winner_ceremony')}
                onBackToGroups={() => setCurrentView('group_selection')}
                onPlayGroup={(groupId) => {
                  setActiveGroupId(groupId);
                  setCurrentView('group_ready');
                }}
              />
            </motion.div>
          )}

          {/* View 7: Final Winner Ceremony */}
          {currentView === 'winner_ceremony' && (
            <motion.div
              key="winner_ceremony"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <WinnerCeremonyView
                groups={groups}
                onBackToLeaderboard={() => setCurrentView('leaderboard')}
                onResetChallenge={handleResetChallenge}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Teacher Control Modal (⚙️ لوحة المعلم) */}
      <TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        groups={groups}
        onSelectGroup={(groupId) => {
          setActiveGroupId(groupId);
          setCurrentView('group_ready');
        }}
        onEditGroup={(groupId) => {
          setActiveGroupId(groupId);
          setCurrentView('group_setup');
        }}
        onResetAll={handleResetChallenge}
        onViewLeaderboard={() => setCurrentView('leaderboard')}
      />

      {/* Classroom Footer */}
      <footer className="mt-auto py-3 text-center text-xs font-semibold text-slate-400 border-t border-slate-200/60 bg-white/50">
        <p>دولة قطر • مادة الرياضيات • الصف الثالث الابتدائي • بطاقة الدخول التفاعلية للمجموعات</p>
      </footer>
    </div>
  );
}
