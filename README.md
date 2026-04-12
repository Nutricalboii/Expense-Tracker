# Smart Expense Tracker (Frontend Mini Project)

## 1. Overview

The Smart Expense Tracker is a lightweight web-based application developed to manage personal and shared financial transactions efficiently. It enables users to track income, expenses, and shared costs in real time using a simulated NoSQL storage approach.

The application is designed as a fully client-side solution and does not require any backend server, ensuring simplicity, fast performance, and ease of deployment.

---

## 2. Key Features

### 2.1 Transaction Management

* Add, edit, and delete transactions
* Supports both income and expense tracking
* Categorized entries (Food, Rent, Bills, Lending, etc.)

### 2.2 NoSQL-like Storage System

* Utilizes browser `localStorage`
* Stores data as JSON documents
* Implements CRUD operations (Create, Read, Update, Delete)

### 2.3 Pass-through Transactions

* Handles temporary financial flows
* Excludes such transactions from net balance calculations
* Prevents misrepresentation of actual financial state

### 2.4 Shared Expense (Mini Splitwise)

* Allows division of expenses among multiple users
* Supports participant name tracking
* Automatically calculates individual share

### 2.5 Credit Card Limit Tracking

* Monitors credit card usage
* Provides alert when usage exceeds predefined limit (₹50,000)

### 2.6 Lending System

* Tracks money given to other individuals
* Stores recipient information for clarity and accountability

### 2.7 Data Visualization

* Implements pie chart using Chart.js
* Displays category-wise expense distribution

---

## 3. Technology Stack

* HTML5 – Structure
* CSS3 – User Interface Design
* JavaScript (Vanilla) – Application Logic
* Chart.js – Data Visualization
* LocalStorage – Data Persistence

---

## 4. Project Structure

```text
expense-tracker/
│── index.html
│── style.css
│── app.js
└── README.md
```

---

## 5. Execution Instructions

1. Download or clone the project repository
2. Open `index.html` in any modern web browser
3. Use the interface to add and manage transactions

No installation or backend setup is required.

---

## 6. System Architecture

User Input → Form Handling → Transaction Object Creation → NoSQL_DB Layer → LocalStorage → UI Update → Chart Rendering

### Implementation Detail

The system follows a simulated NoSQL architecture where each transaction is treated as a document stored in a JSON collection within localStorage.

---

## 7. Limitations

* No backend or centralized database is implemented
* No authentication or user account system
* Data is stored locally and is browser-dependent
* Data may be cleared if browser storage is reset

**Note:**
If the browser is logged into a synchronized account (e.g., Google Chrome Sync), localStorage data may persist across sessions on the same account, but this behavior is not guaranteed across all environments.

---

## 8. Future Scope

* Integration with cloud services (Firebase / Supabase) for real-time sync
* Export functionality (CSV / Excel)
* Conversion into a Progressive Web App (PWA)
* Advanced analytics and reporting features
* Mobile application development

**Note:**
The current implementation is a web application, but it can be extended into a full-stack or mobile-based solution with additional backend and cloud integration.

---

## 9. Team Contribution

* UI/UX Design: Layout and styling implementation
* Logic & Storage: NoSQL_DB abstraction and transaction handling
* Features & Visualization: Shared expense logic, charts, and credit tracking

---

## 10. Conclusion

The project demonstrates how a structured frontend application can simulate database behavior and deliver meaningful financial insights without relying on backend infrastructure. It highlights efficient state management, modular design, and practical feature implementation within a lightweight architecture.

---

## 11. References

1. Chart.js Documentation
   https://www.chartjs.org/docs/latest/

2. MDN Web Docs – LocalStorage
   https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

3. MDN JavaScript Guide
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

4. W3Schools JavaScript Tutorials
   https://www.w3schools.com/js/

5. Font Awesome
   https://fontawesome.com/

6. UI Avatars API
   https://ui-avatars.com/
