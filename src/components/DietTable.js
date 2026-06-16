import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import MealForm from './MealForm';

const DietTable = ({ meals, onAddMeal, onToggleCompletion, onDeleteMeal, onEditMeal }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleEdit = (meal) => {
    setEditingId(meal.id);
    setEditData(meal);
    setShowForm(true);
  };

  const handleFormSubmit = (mealName, mealTime, foodItems) => {
    if (editingId) {
      onEditMeal(editingId, mealName, mealTime, foodItems);
      setEditingId(null);
      setEditData(null);
    } else {
      onAddMeal(mealName, mealTime, foodItems);
    }
    setShowForm(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
    setEditData(null);
  };

  const completedCount = meals.filter(m => m.completed).length;
  const totalPoints = meals.length > 0 ? Math.round(100 / meals.length) : 0;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gym Diet & Meals</h1>
          <p className="text-gray-400">
            {completedCount} of {meals.length} meals completed • {totalPoints} points per meal
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingId(null);
            setEditData(null);
            setShowForm(true);
          }}
          className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold flex items-center space-x-2 w-fit hover:shadow-lg hover:shadow-blue-500/50 smooth-transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Meal</span>
        </motion.button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <MealForm
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            initialData={editData}
            isEditing={editingId !== null}
          />
        )}
      </AnimatePresence>

      {/* Meals List */}
      {meals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect p-12 rounded-xl text-center"
        >
          <p className="text-gray-400 text-lg">No meals planned yet. Add your first meal to get started! 🍎</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-4"
        >
          <AnimatePresence mode="popLayout">
            {meals.map((meal) => (
              <motion.div
                key={meal.id}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                layoutId={meal.id}
                className={`glass-effect p-4 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-2 smooth-transition ${
                  meal.completed
                    ? 'border-green-500 border-opacity-50 bg-gradient-to-r from-green-500 from-opacity-5 to-transparent'
                    : 'border-green-500 border-opacity-20'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onToggleCompletion(meal.id)}
                      className="flex-shrink-0"
                    >
                      {meal.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-500 hover:text-green-500 smooth-transition" />
                      )}
                    </motion.button>
                    <div>
                      <p className={`text-lg font-semibold smooth-transition ${
                        meal.completed ? 'text-gray-500 line-through' : 'text-white'
                      }`}>
                        {meal.name}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {meal.time} • {meal.foodItems.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    meal.completed
                      ? 'bg-green-500 bg-opacity-20 text-green-400'
                      : 'bg-green-500 bg-opacity-20 text-green-400'
                  }`}>
                    +{totalPoints}pts
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(meal)}
                    className="p-2 hover:bg-gray-700 rounded-lg smooth-transition"
                  >
                    <Edit2 className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDeleteMeal(meal.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg smooth-transition"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default DietTable;
