import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Target } from 'lucide-react';
import CircularProgress from './CircularProgress';

const ProgressTracking = ({ tasks, meals, progress, score, weeklyStats }) => {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyAverage, setWeeklyAverage] = useState(0);

  useEffect(() => {
    // Generate mock weekly data
    const mockWeeklyData = [
      { day: 'Mon', progress: 65, date: '2024-01-08' },
      { day: 'Tue', progress: 72, date: '2024-01-09' },
      { day: 'Wed', progress: 58, date: '2024-01-10' },
      { day: 'Thu', progress: 85, date: '2024-01-11' },
      { day: 'Fri', progress: 92, date: '2024-01-12' },
      { day: 'Sat', progress: 78, date: '2024-01-13' },
      { day: 'Sun', progress: progress, date: new Date().toISOString().split('T')[0] },
    ];
    setDailyData(mockWeeklyData);
    const avg = Math.round(
      mockWeeklyData.reduce((sum, day) => sum + day.progress, 0) / mockWeeklyData.length
    );
    setWeeklyAverage(avg);
  }, [progress]);

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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Progress Tracking</h1>
        <p className="text-gray-400">Monitor your fitness discipline and consistency</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Current Score */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Today's Score</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-blue-400">{score.current}</p>
          <p className="text-gray-400 text-xs mt-2">out of {score.total} points</p>
        </motion.div>

        {/* Weekly Average */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Weekly Avg</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-400">{weeklyAverage}%</p>
          <p className="text-gray-400 text-xs mt-2">7-day average</p>
        </motion.div>

        {/* Completion Status */}
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 text-sm font-semibold">Completed</h3>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-400">
            {completedTasks + completedMeals}
          </p>
          <p className="text-gray-400 text-xs mt-2">of {totalActivities} activities</p>
        </motion.div>
      </motion.div>

      {/* Main Progress Section */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        className="glass-effect p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Today's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Details */}
          <div className="space-y-4">
            {/* Tasks Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-semibold">Time Table Tasks</span>
                <span className="text-blue-400 font-semibold">
                  {completedTasks}/{tasks.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      tasks.length > 0 ? `${(completedTasks / tasks.length) * 100}%` : '0%',
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="bg-blue-500 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Meals Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-semibold">Diet Meals</span>
                <span className="text-green-400 font-semibold">
                  {completedMeals}/{meals.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: meals.length > 0 ? `${(completedMeals / meals.length) * 100}%` : '0%',
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="bg-green-500 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Overall Progress */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-semibold text-lg">Overall Progress</span>
                <span className="text-purple-400 font-semibold text-lg">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Circular Progress */}
          <div className="flex justify-center">
            <CircularProgress
              progress={progress}
              size={220}
              strokeWidth={14}
              isCompleted={progress === 100}
            />
          </div>
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className="glass-effect p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Calendar className="w-6 h-6" />
          <span>Weekly Overview</span>
        </h2>

        <div className="flex items-end justify-between space-x-2 h-48">
          {dailyData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${day.progress * 1.5}px`, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center space-y-2 group"
            >
              <div className="relative w-full bg-gradient-to-t from-blue-500 to-green-500 rounded-t-lg hover:shadow-lg hover:shadow-blue-500/50 smooth-transition group-hover:from-blue-400 group-hover:to-green-400">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 smooth-transition bg-gray-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                  {day.progress}%
                </div>
              </div>
              <p className="text-gray-400 text-xs font-semibold">{day.day}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
        className="glass-effect p-6 rounded-xl border border-purple-500 border-opacity-30"
      >
        <h3 className="text-lg font-bold text-purple-400 mb-4">💡 Pro Tips</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>✓ Complete all tasks daily to maintain your streak</li>
          <li>✓ Consistency beats perfection - start with achievable goals</li>
          <li>✓ Track your meals to fuel your gym sessions properly</li>
          <li>✓ Review weekly progress to identify improvement areas</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ProgressTracking;
