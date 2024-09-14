// Sign Up User
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    if (users.find((user) => user.username === username)) {
      document.getElementById("signupErrorMsg").textContent =
        "User already exists!";
      return;
    }

    users.push({ username, password, expenses: [] });
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
  });
}

// Login User
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", username);
      window.location.href = "add-expense.html";
    } else {
      document.getElementById("errorMsg").textContent = "Invalid credentials!";
    }
  });
}

// Add Expense
const expenseForm = document.getElementById("expenseForm");
if (expenseForm) {
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = localStorage.getItem("currentUser");
    if (!username) {
      alert("Please log in first.");
      window.location.href = "index.html";
      return;
    }

    const expense = document.getElementById("expense").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((user) => user.username === username);

    if (user) {
      user.expenses.push({ expense, category, amount, date });
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = "view-expense.html";
    }
  });
}

// View Expense
const expenseTable = document.getElementById("expenseTable");
if (expenseTable) {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    alert("Please log in first.");
    window.location.href = "index.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (user) {
    const tbody = expenseTable.querySelector("tbody");
    user.expenses.forEach((exp) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${exp.expense}</td>
                <td>${exp.category}</td>
                <td>${exp.amount}</td>
                <td>${exp.date}</td>
            `;
      tbody.appendChild(tr);
    });
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
}
