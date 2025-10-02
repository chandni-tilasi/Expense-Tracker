# 💰 Expense Tracker

> **A beautiful, modern expense tracking app that helps you manage your money better!**

Ever wondered where all your money goes? This app makes it super easy to track your daily expenses, see spending patterns, and take control of your finances. Built with the latest web technologies for a smooth, fast experience.

## ✨ What Makes This Special

- 📝 **Easy Expense Entry** - Add expenses in seconds with a clean, intuitive form
- 📊 **Beautiful Charts** - See your spending patterns with interactive pie charts
- 🔍 **Smart Filtering** - Find specific expenses by category or date range
- 📱 **Works Everywhere** - Perfect on your phone, tablet, or computer
- ⚡ **Lightning Fast** - Built with modern tech for instant responses
- 🛡️ **Data Safe** - Your information is secure and private
- 🎨 **Beautiful Design** - Clean, professional interface that's a joy to use

## 🛠️ Built With Love Using

| Technology | What It Does |
|------------|--------------|
| **React Router v7** | Makes the app super fast and smooth |
| **TypeScript** | Keeps everything working perfectly |
| **PostgreSQL** | Stores your data safely and reliably |
| **Tailwind CSS** | Makes everything look beautiful |
| **Chart.js** | Creates those awesome spending charts |
| **Docker** | Easy to deploy anywhere |

## 🧠 My Approach

This expense tracker was built with a **user-first, modern web development approach**:

- **Simplicity First**: Clean, intuitive interface that anyone can use without training
- **Mobile-First**: Responsive design that works perfectly on all devices  
- **Performance Focused**: Fast loading and smooth interactions using modern React patterns
- **TypeScript**: Full type safety to prevent bugs and improve developer experience
- **Component-Based**: Reusable React components for maintainability
- **Database-First**: PostgreSQL with Knex.js for robust data management

## 🚀 Quick Start Guide

> **Ready to start tracking your expenses? Let's get you up and running in just a few minutes!**

### What You'll Need First

Before we begin, make sure you have these installed on your computer:

- **Node.js** (version 18 or newer) - [Download here](https://nodejs.org/)
- **PostgreSQL** (version 12 or newer) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Get the Code 📥

```bash
# Download the project
git clone https://github.com/chandni-tilasi/Expense-Tracker.git
cd Expense-Tracker
```

### Step 2: Install Everything 📦

```bash
# This downloads all the tools the app needs
npm install
```

### Step 3: Set Up Your Database 🔧

First, copy the example settings file:

```bash
cp env.example .env
```

Then, open the `.env` file and update it with your database details:

```env
# Database Configuration
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_password
DB_PORT=5432

# Application Configuration
NODE_ENV=development
PORT=5173
```

### Step 4: Create Your Database 🗄️

Open your PostgreSQL tool (like pgAdmin or command line) and create a new database:

```sql
CREATE DATABASE expense_tracker;
```

### Step 5: Set Up the Database Tables 📊

```bash
# This creates all the tables your app needs
npm run db:migrate

# Optional: Add some sample data to play with
npm run db:seed
```

### Step 6: Launch the App! 🎉

```bash
npm run dev
```

**🎊 That's it!** Open your browser and go to `http://localhost:5173` to see your expense tracker in action!

## 📁 How the App is Organized

Think of this like a well-organized filing cabinet! Here's where everything lives:

```
📁 remixV2/
├── 📁 app/                    # The main app folder
│   ├── 📁 components/         # Reusable pieces (like LEGO blocks)
│   │   ├── 📄 ExpensePieChart.tsx    # The pretty pie chart
│   │   └── 📄 ExpenseLineChart.tsx   # The line chart (for future use)
│   ├── 📁 routes/             # Different pages of the app
│   │   ├── 📄 home.tsx        # Main dashboard (where you see all expenses)
│   │   ├── 📄 add.tsx         # Add new expense page
│   │   └── 📄 edit.$id.tsx    # Edit existing expense page
│   ├── 📄 app.css            # Global styling (colors, fonts, etc.)
│   └── 📄 root.tsx           # The main app component
├── 📁 lib/                    # Helper functions
│   ├── 📄 db.server.ts       # All database operations
│   └── 📄 knex.js           # Database connection setup
├── 📁 migrations/            # Database table creation scripts
├── 📁 seeders/              # Sample data for testing
├── 📁 public/               # Images, icons, and other static files
└── 📄 package.json          # Project configuration and dependencies
```

## 🗄️ How Your Data is Stored

The app uses a simple but powerful database table to store your expenses:

```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,           -- Unique ID for each expense
  description VARCHAR(255) NOT NULL,  -- What you spent money on
  amount DECIMAL(10,2) NOT NULL,   -- How much (supports cents!)
  category VARCHAR(100) NOT NULL,  -- Food, Transport, etc.
  date DATE NOT NULL DEFAULT CURRENT_DATE,  -- When you spent it
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When you added it
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- When you last changed it
);
```

## 🎨 Commands You Can Use

Here are all the commands you can run to manage your app:

| Command | What It Does | When to Use |
|---------|--------------|-------------|
| `npm run dev` | 🚀 Start the app for development | When you want to work on the app |
| `npm run build` | 🏗️ Prepare the app for production | Before deploying to a server |
| `npm run start` | 🌐 Run the production version | When the app is ready to go live |
| `npm run typecheck` | 🔍 Check for code errors | Before committing changes |
| `npm run db:migrate` | 📊 Set up database tables | First time setup or after updates |
| `npm run db:migrate:rollback` | ↩️ Undo last database change | If something goes wrong |
| `npm run db:seed` | 🌱 Add sample data | To test with fake expenses |
| `npm run db:reset` | 🔄 Start fresh with database | When you want to clear everything |
| `npm run db:make:migration` | ✨ Create new database change | When adding new features |
| `npm run db:make:seed` | ✨ Create new sample data | When adding test data |

## 🐳 Deploy with Docker (Optional)

Want to run this in a container? We've got you covered!

```bash
# Build the app into a Docker image
docker build -t expense-tracker .

# Run it in a container
docker run -p 3000:3000 expense-tracker
```

## 🎯 What You Can Do With This App

### 🏠 Dashboard - Your Financial Command Center
- **See Everything at Once** - All your expenses in one beautiful table
- **Total at a Glance** - Know exactly how much you've spent
- **Visual Spending** - Pie chart shows where your money goes
- **Smart Filters** - Find specific expenses by category or date

### ➕ Add New Expenses - Super Easy!
- **Quick Entry** - Add expenses in seconds
- **Smart Validation** - Prevents mistakes before they happen
- **Pre-set Categories** - Choose from: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Education, Travel, or Other
- **Date Protection** - Can't accidentally add future expenses
- **Currency Support** - Handles cents perfectly

### ✏️ Edit Expenses - Fix Mistakes Instantly
- **Pre-filled Forms** - All your data is already there
- **Same Smart Rules** - Same validation as adding new ones
- **Seamless Updates** - Changes save instantly

### 🗑️ Delete Expenses - Clean Up Your Records
- **Confirmation Dialog** - Prevents accidental deletions
- **Works Everywhere** - Perfect on phone, tablet, or computer
- **Instant Feedback** - See results immediately

## ⚙️ How to Customize

### 🎨 Making It Look Different
The app uses Tailwind CSS with a beautiful blue theme. Want to change colors? Look in the `app/app.css` file!

### 🗄️ Database Settings
All database settings are in `knexfile.js`. It automatically handles development and production environments.

## 🚀 Going Live (Deployment)

### For Production Use
```bash
# Build the app for production
npm run build

# Start the production server
npm run start
```

### Environment Settings for Live Server
Make sure these are set on your live server:

- `NODE_ENV=production`
- `DB_HOST` - Your database server address
- `DB_USER` - Your database username
- `DB_PASSWORD` - Your database password
- `DB_NAME` - Your database name
- `DB_PORT` - Your database port (usually 5432)

## 🤝 Want to Help Make This Better?

We'd love your help! Here's how you can contribute:

1. **Fork the project** - Make your own copy
2. **Create a new branch** - `git checkout -b feature/your-awesome-idea`
3. **Make your changes** - Add features, fix bugs, improve docs
4. **Test everything** - Make sure it still works
5. **Submit a pull request** - We'll review and merge if it's good!

## 📄 License

This project is open source and free to use under the MIT License. Feel free to use it for personal or commercial projects!

## 🆘 Need Help?

Having trouble? We're here to help!

1. **Check existing issues** - Someone might have had the same problem
2. **Create a new issue** - Tell us what's going wrong
3. **Be specific** - Include steps to reproduce any bugs
4. **Include details** - What you expected vs. what happened

## 🔮 What's Coming Next?

We're always working to make this better! Here's what we're planning:

- [ ] 👥 **Multi-user support** - Share with family members
- [ ] 📊 **Export your data** - Download as CSV or PDF
- [ ] 💰 **Budget tracking** - Set limits and get alerts
- [ ] 🔄 **Recurring expenses** - Automatically add monthly bills
- [ ] 📱 **Mobile app** - Native app for your phone
- [ ] 📈 **Advanced reports** - More detailed analytics
- [ ] 🏷️ **Custom categories** - Create your own expense types
- [ ] 📷 **Receipt photos** - Attach images to expenses
- [ ] 🌍 **Multiple currencies** - Support for different countries
- [ ] 📧 **Email reports** - Weekly/monthly summaries

---

**💝 Made with love using React Router v7, TypeScript, and PostgreSQL**

*Thanks for using our expense tracker! We hope it helps you take control of your finances.*