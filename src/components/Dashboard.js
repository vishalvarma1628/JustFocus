import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, CheckCircle2, RotateCcw } from 'lucide-react';
import CircularProgress from './CircularProgress';

const Dashboard = ({ tasks, meals, streak, progress, score, onResetDay }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (progress === 100 && tasks.length > 0 && meals.length > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress, tasks.length, meals.length]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const completedMeals = meals.filter(m => m.completed).length;
  const totalActivities = tasks.length + meals.length;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl"
          >
            🎉
          </motion.div>
        </motion.div>
      )}

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Focus on the Process, Results Will Follow
        </h1>
        <p className="text-gray-400 text-sm md:text-base">Track your discipline, celebrate your progress</p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Score Card */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Total Points</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-blue-400">
            {score.current}/{score.total}
          </p>
          <p className="text-gray-400 text-xs mt-2">Daily Score</p>
        </motion.div>

        {/* Completed Tasks Card */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Completed</h3>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-400">
            {completedTasks + completedMeals}/{totalActivities}
          </p>
          <p className="text-gray-400 text-xs mt-2">Tasks & Meals</p>
        </motion.div>

        {/* Streak Card */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Streak</h3>
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-400">{streak}</p>
          <p className="text-gray-400 text-xs mt-2">Days Completed</p>
        </motion.div>

        {/* Progress Card */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Progress</h3>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-gradient-text">{progress}%</p>
          <p className="text-gray-400 text-xs mt-2">Completion</p>
        </motion.div>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        className="glass-effect p-8 rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Today's Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">Time Table Tasks</span>
                  <span className="text-blue-400 font-semibold">{completedTasks}/{tasks.length}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full smooth-transition"
                    style={{
                      width: tasks.length > 0 ? `${(completedTasks / tasks.length) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">Diet Meals</span>
                  <span className="text-green-400 font-semibold">{completedMeals}/{meals.length}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full smooth-transition"
                    style={{
                      width: meals.length > 0 ? `${(completedMeals / meals.length) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">Overall Progress</span>
                  <span className="text-purple-400 font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full smooth-transition"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex flex-col items-center justify-center">
            <CircularProgress
              progress={progress}
              size={200}
              strokeWidth={12}
              isCompleted={progress === 100}
            />
            {progress === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-4 text-center"
              >
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-green-400 font-semibold">Perfect Day!</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Celebration Message and Reset Button */}
      {progress === 100 && tasks.length > 0 && meals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-6 rounded-xl border-2 border-green-500 border-opacity-50 bg-gradient-to-r from-green-500 from-opacity-10 to-transparent"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2">🎉 Congratulations!</h3>
              <p className="text-gray-300">You completed your day perfectly. Keep up the discipline!</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onResetDay}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/50 smooth-transition"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Start New Day</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
