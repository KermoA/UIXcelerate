# UIXcelerate - UI Elements Library

UIXcelerate is a customizable UI Components Library built with **React (TypeScript)** and **ASP.NET Core**. It allows users to browse, preview, and modify UI elements (buttons, forms, navbars, cards, etc.) with real-time CSS editing and code viewing. Admins can dynamically manage elements using the admin panel.

---

## 📚 Features

- ✅ Predefined HTML/CSS UI components (buttons, cards, forms, navbars, etc.)
- ✏️ Live CSS editing with instant preview
- 🔍 View raw HTML & CSS of each component
- 🛠️ Admin panel to manage components dynamically
- 🗃️ PostgreSQL-powered backend
- 💡 Uses React-Bootstrap

---

## ⚙️ Tech Stack

| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Frontend  | React + TypeScript (`uixcelerate.client`)   |
| Backend   | ASP.NET Core Web API (`UIXcelerate.Server`) |
| Database  | PostgreSQL                                  |
| Styling   | React-Bootstrap                             |

---

## 🚀 Project Setup (All in One)

### 🔧 Requirements
- Node.js (v18 or later)
- .NET SDK (8.0 or later)
- PostgreSQL installed and running

---

### 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/KermoA/UIXcelerate.git
cd UIXcelerate

# 2. Setup and run the backend
cd UIXcelerate.Server
dotnet restore

# 3. Configure secrets.json (recommended for local dev)
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=uixcelerate;Username=yourUsername;Password=yourPassword"
# Set your custom admin username and password
dotnet user-secrets set "Admin:Username" "your-username"  # Replace with your desired admin username
dotnet user-secrets set "Admin:Password" "your-password"  # Replace with your desired admin password


# 4. Run migrations and start the backend
dotnet ef database update
dotnet run
# Backend runs at https://localhost:7168

# 5. Setup and run the frontend
cd ../uixcelerate.client
npm install
npm run dev
# Frontend runs at https://localhost:5173

# 6. Admin Login
Once the app is running, access the admin panel here:  
👉 https://localhost:5173/admin-login

**Default admin credentials**:  
- **Username**: Your custom username from `secrets.json`  
- **Password**: Your custom password from `secrets.json`
