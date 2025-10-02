# 💰 Expense Tracker

> **A beautiful, modern expense tracking app that helps you manage your money better!**

## 🧠 My Approach

This expense tracker was built with a **user-first, modern web development approach**:

- **Simplicity First**: Clean, intuitive interface that anyone can use without training
- **Mobile-First**: Responsive design that works perfectly on all devices  
- **Performance Focused**: Fast loading and smooth interactions using modern React patterns
- **TypeScript**: Full type safety to prevent bugs and improve developer experience
- **Component-Based**: Reusable React components for maintainability
- **Database-First**: PostgreSQL with Knex.js for robust data management

## 🛠️ Built With

- **React Router v7** - Modern routing and SSR
- **TypeScript** - Type safety and better development experience
- **PostgreSQL** - Reliable data storage
- **Tailwind CSS** - Beautiful, responsive styling
- **Chart.js** - Interactive data visualization
- **Docker** - Easy deployment

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (version 18 or newer) - [Download here](https://nodejs.org/)
- **PostgreSQL** (version 12 or newer) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/chandni-tilasi/Expense-Tracker.git
   cd Expense-Tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
```

   Update the `.env` file with your database credentials:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_password
DB_PORT=5432
NODE_ENV=development
PORT=5173
```

4. **Create database**
```sql
CREATE DATABASE expense_tracker;
```

5. **Run database migrations**
```bash
npm run db:migrate
   ```

6. **Seed sample data (optional)**
   ```bash
npm run db:seed
```

7. **Start the development server**
```bash
npm run dev
```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed sample data
- `npm run db:reset` - Reset database

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ using React Router v7, TypeScript, and PostgreSQL**