# Expense Tracker

A lightweight, front-end finance application designed to track personal and shared expenses. This project was developed as a mini-project for the Advanced Front-end (CSF 372) course. It focuses on clean architecture, simulated NoSQL data persistence, and real-time data visualization without relying on complex backend infrastructure.

## 1. Problem Statement

Managing personal finances and group expenses often requires multiple applications or complex spreadsheet setups. Users typically face the following challenges:
*   Difficulty in distinguishing between actual personal expenses and temporary "pass-through" money (e.g., receiving money from a friend to pay a joint bill).
*   Complexity in splitting bills and calculating individual shares accurately.
*   Lack of immediate visual insights into spending habits.
*   The overhead of requiring a continuous internet connection or backend server just to log daily transactions.

## 2. Solution (Cure)

This application provides a consolidated, client-side solution by offering:
*   **Simulated NoSQL Storage:** Utilizes the browser's `localStorage` as a document-oriented database to persist transaction records across sessions.
*   **Pass-through Transactions:** Introduces a specialized toggle for transactions that should be logged for historical accuracy but excluded from the net balance calculation.
*   **Integrated Splitwise Logic:** Allows users to mark an expense as shared, specify the total number of participants, and input their names. The system automatically divides the total amount and records only the user's individual share against their balance.
*   **Dynamic Data Visualization:** Integrates `Chart.js` to render real-time pie charts detailing expense distribution by category.

## 3. Usage Instructions

### Prerequisites
A modern web browser (e.g., Chrome, Firefox, Edge, Safari). No Node.js, npm, or external backend servers are required to run the core application.

### Running the Application
1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/Nutricalboii/Expense-Tracker.git
    ```
2.  Navigate to the project directory.
3.  Open the `index.html` file directly in your web browser.

### Key Workflows
*   **Adding a Standard Expense:** Enter the amount, select "Expense", choose a category, and click "Add Transaction".
*   **Logging a Shared Bill:** Enter the total bill amount, check "Shared Expense", enter the number of people dividing the bill, and optionally provide their names. The app will calculate and deduct only your share from your balance.
*   **Recording Pass-through Money:** If you receive money meant immediately for someone else, check the "Pass-through" box. The transaction will appear in your history but will not artificially inflate your income or expense totals.
*   **Deleting Records:** Click the 'x' button next to any transaction in the history list to remove it and instantly recalculate the dashboard.

## 4. Further Implementation Ideas

While the current scope fulfills the requirements of a robust client-side tracker, future iterations could explore:
*   **PWA Integration:** Convert the application into a Progressive Web App (PWA) with service workers for full offline capabilities and installation on mobile devices.
*   **Data Export/Import:** Allow users to export their `localStorage` data to CSV or JSON formats for backup and cross-device migration.
*   **Authentication & Cloud Sync:** Introduce Firebase or Supabase to enable secure user logins and real-time synchronization across multiple devices.
*   **Advanced Analytics:** Implement line charts for trend analysis over time (e.g., spending by month) and allow custom date-range filtering.
*   **Custom Categories:** Provide users the ability to add, edit, and delete their own transaction categories.
