# 🎉 Quiz App  

An interactive quiz application built with **React + Vite**.  
Users can choose a difficulty, answer multiple-choice questions from the [Open Trivia Database](https://opentdb.com/), and track their scores locally.  

---

## 🚀 Features
- 📚 Fetches trivia questions from the [OpenTDB API](https://opentdb.com/).
- 🎯 Difficulty selection (Any, Easy, Medium, Hard).
- ⏳ Countdown timer per question.
- 📊 Progress bar for quiz completion.
- ✅ Instant answer review after completion.
- 🏆 Local High Scores (saved in browser storage).
- 📱 Responsive and accessible UI with keyboard support.
- ⚡ Built with **React + Vite + Tailwind CSS**.

---

## 📸 Screenshots  
<img width="1440" height="779" alt="Screenshot 2025-09-05 at 10 25 32 AM" src="https://github.com/user-attachments/assets/9420d024-34a8-417e-8ef8-08e7d7eaccd0" />


---

## 🛠️ Installation & Setup  

Clone the repository:
```bash
git clone https://github.com/Aksdec14/Quiz-App.git
cd Quiz-App
npm install
npm run dev
```
🔗 API Reference
https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple

📂 Project Structure

Quiz-App/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom hooks (localStorage etc.)
│   ├── lib/           # Utility functions (API fetch)
│   ├── pages/         # App pages (Home, Quiz, Results)
│   ├── App.jsx        # Main App entry
│   └── main.jsx       # React DOM rendering
├── package.json
├── vite.config.js
└── README.md

🎨 Tech Stack

React 18

Vite (bundler)

Tailwind CSS (styling)

React Router (navigation)

Live : https://quiz-app-five-zeta-49.vercel.app/
