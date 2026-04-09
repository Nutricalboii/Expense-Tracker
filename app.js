/**
 * SIMULATED NOSQL STORAGE ENGINE
 * This mimics a document-oriented database (like MongoDB) using LocalStorage.
 * In Viva, explain: "We used a simulated NoSQL approach for data persistence, 
 * treating each transaction as a document in a JSON collection."
 */
const CREDIT_LIMIT = 50000;

const NoSQL_DB = {
    COLLECTION: "transactions",

    // Create (Insert Document)
    insert: function(data) {
        const docs = this.getAll();
        docs.push(data);
        localStorage.setItem(this.COLLECTION, JSON.stringify(docs));
    },

    // Read (Get all documents)
    getAll: function() {
        return JSON.parse(localStorage.getItem(this.COLLECTION)) || [];
    },

    // Delete (Remove document by ID)
    delete: function(id) {
        const docs = this.getAll().filter(doc => doc.id !== id);
        localStorage.setItem(this.COLLECTION, JSON.stringify(docs));
    }
};

// UI Elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("list");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const modeInput = document.getElementById("mode");
const dateInput = document.getElementById("date");
const passthroughInput = document.getElementById("passthrough");
const sharedInput = document.getElementById("shared");
const peopleCountInput = document.getElementById("peopleCount");
const sharedNamesInput = document.getElementById("sharedNames");
const groupTypeInput = document.getElementById("groupType");
const descriptionInput = document.getElementById("description");
const lentToInput = document.getElementById("lentTo");
const lendingGroup = document.getElementById("lending-group");
const sharedGroup = document.getElementById("shared-input-group");
const addBtn = document.getElementById("addBtn");

let myChart = null;

// Initialize
dateInput.valueAsDate = new Date();

function toggleSharedInput() {
    sharedGroup.style.display = sharedInput.checked ? "block" : "none";
}

function toggleLendingInput() {
    lendingGroup.style.display = categoryInput.value === "Lending" ? "block" : "none";
}

/**
 * CORE LOGIC: ADD TRANSACTION
 */
function addTransaction() {
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const mode = modeInput.value;
    const date = dateInput.value;
    const isPassthrough = passthroughInput.checked;
    const isShared = sharedInput.checked;
    const peopleCount = parseInt(peopleCountInput.value) || 2;
    const names = sharedNamesInput.value.trim();
    const groupType = groupTypeInput.value;
    const description = descriptionInput.value.trim();
    const lentTo = lentToInput ? lentToInput.value.trim() : "";

    if (isNaN(amount) || amount <= 0) return alert("Enter valid amount");
    if (!date) return alert("Select a date");

    // Logic for Mini Splitwise: Divide amount by people
    const userShare = isShared ? (amount / peopleCount) : amount;

    // Create a "Document" for our NoSQL store
    const transaction = {
        id: Date.now(),
        originalAmount: amount,
        amount: userShare,
        type,
        category,
        mode,
        date,
        description,
        lentTo,
        groupType: isShared ? groupType : "",
        isPassthrough,
        isShared,
        peopleCount: isShared ? peopleCount : 1,
        sharedWith: isShared ? names : ""
    };

    // NoSQL Insert
    NoSQL_DB.insert(transaction);
    
    // UI Reset
    resetForm();
    updateUI();
}

function resetForm() {
    amountInput.value = "";
    descriptionInput.value = "";
    if (lentToInput) lentToInput.value = "";
    passthroughInput.checked = false;
    sharedInput.checked = false;
    sharedNamesInput.value = "";
    toggleSharedInput();
    categoryInput.value = "Food"; // Optional reset to default
    toggleLendingInput();
    dateInput.valueAsDate = new Date();
}

function deleteTransaction(id) {
    NoSQL_DB.delete(id);
    updateUI();
}

/**
 * UI REFRESH: SUMMARY + LIST + CHART
 */
function updateUI() {
    const transactions = NoSQL_DB.getAll();
    listEl.innerHTML = "";
    let income = 0;
    let expense = 0;
    let creditUsed = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.classList.add(t.type === "income" ? "income-item" : "expense-item");
        if (t.isPassthrough) li.classList.add("passthrough-item");

        let label = t.category;
        if (t.category === "Lending" && t.lentTo) {
            label += ` → ${t.lentTo}`;
        }
        if (t.description) label += ` - ${t.description}`;
        if (t.isPassthrough) label += " (Pass-through)";
        
        // Dynamic Label for Shared Expense
        let splitDetail = "";
        if (t.isShared) {
            label += ` (Split with ${t.peopleCount})`;
            splitDetail = `<span class="item-sub">
                Group: ${t.groupType || "Others"} <br>
                Shared with: ${t.sharedWith || "Group"}
            </span>`;
        }

        li.innerHTML = `
            <div class="item-details">
                <span class="item-title">${label}</span>
                <span class="item-sub">${t.date} • ${t.mode}</span>
                ${splitDetail}
                ${t.isShared ? `<span class="item-sub">Total Bill: ₹${t.originalAmount.toLocaleString()}</span>` : ""}
            </div>
            <div style="display: flex; align-items: center;">
                <span class="item-amount">${t.type === "income" ? "+" : "-"} ₹${t.amount.toLocaleString()}</span>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">&times;</button>
            </div>
        `;
        listEl.appendChild(li);

        // Balance Calculation (Ignore Pass-through documents)
        if (!t.isPassthrough) {
            if (t.type === "income") income += t.amount;
            else expense += t.amount;
            
            if (t.mode === "Credit Card" && t.type === "expense") {
                creditUsed += t.amount;
            }
        }
    });

    if (creditUsed > CREDIT_LIMIT) {
        alert("⚠️ Credit limit exceeded!");
    }

    balanceEl.innerText = (income - expense).toLocaleString();
    incomeEl.innerText = income.toLocaleString();
    expenseEl.innerText = expense.toLocaleString();

    renderChart(transactions);
}

/**
 * DATA VISUALIZATION: CHART.JS
 */
function renderChart(transactions) {
    const categoryTotals = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const ctx = document.getElementById("chart");
    const wrapper = document.querySelector(".chart-wrapper");

    if (myChart) myChart.destroy();

    if (labels.length === 0) {
        const oldMsg = wrapper.querySelector(".no-data-msg");
        if (!oldMsg) {
            const msg = document.createElement("p");
            msg.className = "no-data-msg";
            msg.innerText = "No expenses recorded yet.";
            wrapper.appendChild(msg);
        }
        return;
    } else {
        const msg = wrapper.querySelector(".no-data-msg");
        if (msg) msg.remove();
    }

    myChart = new Chart(ctx.getContext("2d"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ["#3498db", "#e74c3c", "#27ae60", "#f1c40f", "#9b59b6"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } }
        }
    });
}

// Global scope listener for Add Button
addBtn.addEventListener("click", addTransaction);

// Run on Load
updateUI();
