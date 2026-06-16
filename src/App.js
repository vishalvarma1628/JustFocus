import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import TimeTable from './components/TimeTable';
import DietTable from './components/DietTable';
import ProgressTracking from './components/ProgressTracking';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [streak, setStreak] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('justfocus_tasks')) || [];
    const savedMeals = JSON.parse(localStorage.getItem('justfocus_meals')) || [];
    const savedStreak = JSON.parse(localStorage.getItem('justfocus_streak')) || 0;
    const savedWeeklyStats = JSON.parse(localStorage.getItem('justfocus_weekly')) || {};

    setTasks(savedTasks);
    setMeals(savedMeals);
    setStreak(savedStreak);
    setWeeklyStats(savedWeeklyStats);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('justfocus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('justfocus_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('justfocus_streak', JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('justfocus_weekly', JSON.stringify(weeklyStats));
  }, [weeklyStats]);

  const addTask = (taskName, startTime, endTime) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      startTime,
      endTime,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const addMeal = (mealName, mealTime, foodItems) => {
    const newMeal = {
      id: Date.now(),
      name: mealName,
      time: mealTime,
      foodItems,
      completed: false,
    };
    setMeals([...meals, newMeal]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleMealCompletion = (mealId) => {
    setMeals(meals.map(meal =>
      meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteMeal = (mealId) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
  };

  const editTask = (taskId, taskName, startTime, endTime) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, name: taskName, startTime, endTime } : task
    ));
  };

  const editMeal = (mealId, mealName, mealTime, foodItems) => {
    setMeals(meals.map(meal =>
      meal.id === mealId ? { ...meal, name: mealName, time: mealTime, foodItems } : meal
    ));
  };

  const resetDay = () => {
    const allCompleted = tasks.length > 0 && tasks.every(t => t.completed) &&
                        meals.length > 0 && meals.every(m => m.completed);
    
    if (allCompleted) {
      setStreak(streak + 1);
    }
    
    setTasks([]);
    setMeals([]);
  };

  const calculateProgress = () => {
    const totalActivities = tasks.length + meals.length;
    if (totalActivities === 0) return 0;
    
    const completedActivities = tasks.filter(t => t.completed).length + 
                               meals.filter(m => m.completed).length;
    return Math.round((completedActivities / totalActivities) * 100);
  };

  const calculateScore = () => {
    const totalActivities = tasks.length + meals.length;
    if (totalActivities === 0) return { current: 0, total: 100 };
    
    const pointsPerActivity = 100 / totalActivities;
    const completedActivities = tasks.filter(t => t.completed).length + 
                               meals.filter(m => m.completed).length;
    const currentScore = Math.round(completedActivities * pointsPerActivity);
    
    return { current: currentScore, total: 100 };
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="dark-theme min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              meals={meals}
              streak={streak}
              progress={calculateProgress()}
              score={calculateScore()}
              onResetDay={resetDay}
            />
          )}
          
          {currentPage === 'timetable' && (
            <TimeTable
              tasks={tasks}
              onAddTask={addTask}
              onToggleCompletion={toggleTaskCompletion}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
            />
          )}
          
          {currentPage === 'diet' && (
            <DietTable
              meals={meals}
              onAddMeal={addMeal}
              onToggleCompletion={toggleMealCompletion}
              onDeleteMeal={deleteMeal}
              onEditMeal={editMeal}
            />
          )}
          
          {currentPage === 'progress' && (
            <ProgressTracking
              tasks={tasks}
              meals={meals}
              progress={calculateProgress()}
              score={calculateScore()}
              weeklyStats={weeklyStats}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default App;
