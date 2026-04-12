# 💰 Smart Expense Tracker (Frontend Mini Project)

## 📌 Overview
The Smart Expense Tracker is a lightweight web-based application designed to manage personal and shared financial transactions efficiently. It provides real-time tracking of income, expenses, and shared costs using a simulated NoSQL storage system.

The application runs entirely on the client side without requiring any backend server.

## 🚀 Key Features

### 💳 Transaction Management
- Add, edit, and delete transactions
- Supports income and expense tracking
- Categorized transactions (Food, Rent, Bills, Lending, etc.)

### 🧠 NoSQL-like Storage
- Uses browser localStorage
- Stores transactions as JSON documents
- Implements CRUD operations (Create, Read, Update, Delete)

### 🔁 Pass-through Transactions
- Tracks temporary money flows
- Does NOT affect actual balance
- Prevents incorrect financial calculations

### 👥 Shared Expense (Mini Splitwise)
- Divide expenses among multiple users
- Store participant names
- Automatically calculates individual share

### 💳 Credit Card Limit Tracking
- Tracks credit usage
- Alerts when limit exceeds ₹50,000

### 🏠 Lending System
- Tracks money given to others
- Stores recipient name for clarity

### 📊 Data Visualization
- Pie chart using Chart.js
- Shows expense distribution by category

## 🛠️ Tech Stack
- **HTML5** – Structure
- **CSS3** – UI Design
- **JavaScript (Vanilla)** – Logic
- **Chart.js** – Data Visualization
- **LocalStorage** – Data Persistence

## 📂 Project Structure
```text
expense-tracker/
│── index.html
│── style.css
│── app.js
└── README.md
```

## ⚙️ How to Run
1. Download or clone the project
2. Open `index.html` in any modern browser
3. Start adding transactions

No installation or backend required.

## 🧠 System Architecture
**User Input → Form → Transaction Object → NoSQL_DB → LocalStorage → UI Update → Chart Rendering**

### Implementation Detail
👉 *The system uses a simulated NoSQL architecture where each transaction is treated as a document stored in a JSON collection inside localStorage.*

## ⚠️ Limitations
- No backend/database server
- No login/authentication
- Data stored locally (browser-specific)

## 🔮 Future Scope
- Cloud sync (Firebase/Supabase)
- Export to CSV/Excel
- Mobile app version
- Advanced analytics dashboard

## 👨‍💻 Team Contribution
- **UI/UX Design**: Layout & styling
- **Logic & Storage**: NoSQL_DB + calculations
- **Features**: Splitwise + Charts + Credit system

## 🎯 Conclusion
This project demonstrates how a structured, lightweight frontend application can simulate database behavior and provide meaningful financial insights without backend complexity.

## 📚 References
1. Chart.js Documentation
   https://www.chartjs.org/docs/latest/
2. MDN Web Docs – LocalStorage
   https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
3. MDN JavaScript Guide
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
4. W3Schools JavaScript Tutorials
   https://www.w3schools.com/js/
5. Font Awesome Icons
   https://fontawesome.com/
6. UI Avatars API
   https://ui-avatars.com/
