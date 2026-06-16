# JustFocus - Fitness Productivity Web App

**Focus on the Process, Results Will Follow.**

JustFocus is a modern, responsive fitness productivity web app designed to help gym users stay disciplined by managing their daily routines, diet, and tracking their progress.

## 🏋️ Features

### 📊 Dashboard
- **Today's Progress**: Real-time progress visualization
- **Total Points**: Daily score tracking system
- **Completed Tasks**: Track tasks and meals completed
- **Completion Percentage**: Visual progress indicators
- **Streak Counter**: Maintain your daily consistency
- **Celebration Animation**: Celebrate when completing all tasks

### ⏰ Time Table
- Add daily tasks with start and end times
- Mark tasks as completed
- Edit and delete tasks
- View total points available per task
- Auto-calculated point distribution

### 🍎 Diet & Meals
- Plan meals with specific times
- Add multiple food items per meal
- Mark meals as completed
- Edit and delete meals
- Track nutrition schedule

### 📈 Progress Tracking
- **Weekly Overview**: View 7-day progress chart
- **Performance Metrics**: Score, completion status, weekly average
- **Daily Breakdown**: Tasks vs meals completion rates
- **Visual Analytics**: Beautiful chart representations
- **Pro Tips**: Fitness and productivity advice

### 💾 Data Persistence
- **Local Storage**: All data saved locally
- **Automatic Sync**: Changes save automatically
- **No Account Required**: Privacy-focused approach

## 🎨 Design
- **Theme**: Dark mode with premium fitness aesthetic
- **Colors**: Black, White, Blue, and Green accents
- **Responsive**: Mobile, tablet, and desktop optimized
- **Animations**: Smooth transitions and effects using Framer Motion
- **Modern UI**: Glass-morphism effects and gradient accents

## 🚀 Technology Stack
- **React.js**: UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Local Storage API**: Client-side data persistence

## 📋 Point System

**Total Daily Score**: 100 points

Points are automatically divided equally among all tasks and meals.

**Example:**
- 10 total activities (tasks + meals)
- Each activity = 10 points
- Complete an activity → +10 points instantly
- Progress bar updates in real-time

## 🎉 Completion Logic

When all timetable tasks and diet meals are completed:
- ✅ Celebration animation triggers
- 🏆 Trophy icon displays
- 😍 "Congratulations! You completed your day." message
- 🔥 Streak counter increments
- 🔄 "Start New Day" button appears

## 📱 Pages

1. **Dashboard** - Overview of today's progress and statistics
2. **Time Table** - Manage daily tasks
3. **Diet Table** - Manage meals and nutrition
4. **Progress** - Detailed analytics and weekly overview

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd justfocus

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start the development server
npm start
```

## 🏗️ Build

```bash
npm run build
```

This creates an optimized production build in the `/build` directory.

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.4",
  "lucide-react": "^0.263.1",
  "date-fns": "^2.30.0",
  "tailwindcss": "^3.3.0"
}
```

## 💡 How to Use

### Getting Started
1. Open the app and navigate to "Time Table"
2. Add your daily tasks with times
3. Go to "Diet Table" and add your meals
4. Switch to "Dashboard" to see your progress
5. Complete tasks and meals by clicking the circle icon
6. Watch your points increase and progress bar fill up

### Maximizing Your Results
- Plan realistic tasks and meals
- Be consistent with daily completion
- Review weekly progress to adjust goals
- Use the point system as motivation
- Maintain your streak for accountability

## 🔐 Privacy
All data is stored locally in your browser. No information is sent to external servers.

## 🤝 Contributing
Feel free to fork this project and submit pull requests for improvements.

## 📄 License
This project is open source and available under the MIT License.

## 🚀 Future Enhancements
- Cloud sync with authentication
- Export progress reports
- Custom themes and color schemes
- Social sharing features
- Mobile app versions
- AI-powered recommendations
- Integration with fitness trackers
- Custom notifications and reminders

---

**JustFocus** - Because discipline is the bridge between goals and accomplishment. 💪
