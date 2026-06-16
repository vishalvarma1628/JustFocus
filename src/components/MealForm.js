import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';

const MealForm = ({ onSubmit, onClose, initialData, isEditing }) => {
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [foodItems, setFoodItems] = useState(['']);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setMealName(initialData.name);
      setMealTime(initialData.time);
      setFoodItems(initialData.foodItems);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!mealName.trim()) newErrors.mealName = 'Meal name is required';
    if (!mealTime) newErrors.mealTime = 'Meal time is required';
    if (foodItems.every(item => !item.trim())) {
      newErrors.foodItems = 'At least one food item is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const filteredFoodItems = foodItems.filter(item => item.trim());
      onSubmit(mealName, mealTime, filteredFoodItems);
      setMealName('');
      setMealTime('');
      setFoodItems(['']);
    }
  };

  const addFoodItem = () => {
    setFoodItems([...foodItems, '']);
  };

  const removeFoodItem = (index) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const updateFoodItem = (index, value) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index] = value;
    setFoodItems(newFoodItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-green-500 border-opacity-20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Meal' : 'Add New Meal'}
          </h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-400" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Meal Name
            </label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., Breakfast, Lunch, Pre-Workout"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 smooth-transition"
            />
            {errors.mealName && (
              <p className="text-red-400 text-xs mt-1">{errors.mealName}</p>
            )}
          </div>

          {/* Meal Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Meal Time
            </label>
            <input
              type="time"
              value={mealTime}
              onChange={(e) => setMealTime(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 smooth-transition"
            />
            {errors.mealTime && (
              <p className="text-red-400 text-xs mt-1">{errors.mealTime}</p>
            )}
          </div>

          {/* Food Items */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Food Items
            </label>
            <div className="space-y-2">
              {foodItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateFoodItem(index, e.target.value)}
                    placeholder={`Food item ${index + 1}`}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 smooth-transition"
                  />
                  {foodItems.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeFoodItem(index)}
                      className="p-2 hover:bg-gray-700 rounded-lg smooth-transition"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </motion.button>
                  )}
                </div>
              ))}
              {errors.foodItems && (
                <p className="text-red-400 text-xs mt-1">{errors.foodItems}</p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={addFoodItem}
              className="mt-2 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-semibold flex items-center justify-center space-x-2 smooth-transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </motion.button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold smooth-transition"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 smooth-transition"
            >
              {isEditing ? 'Update' : 'Add'} Meal
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MealForm;
