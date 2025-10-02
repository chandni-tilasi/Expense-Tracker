import { db } from "./knex";

// Expense type definition
export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

// Get all expenses
export async function getAllExpenses(): Promise<Expense[]> {
  const expenses = await db("expenses")
    .select(
      "id",
      "description",
      "amount",
      "category",
      "date",
      "created_at",
      "updated_at"
    )
    .orderBy("date", "desc")
    .orderBy("created_at", "desc");

  // Convert amount strings to numbers
  return expenses.map((expense) => ({
    ...expense,
    amount: parseFloat(expense.amount),
  }));
}

// Get expense by ID
export async function getExpenseById(id: number): Promise<Expense | null> {
  const result = await db("expenses")
    .select(
      "id",
      "description",
      "amount",
      "category",
      "date",
      "created_at",
      "updated_at"
    )
    .where("id", id)
    .first();

  if (!result) return null;

  // Convert amount string to number
  return {
    ...result,
    amount: parseFloat(result.amount),
  };
}

// Create new expense
export async function createExpense(
  expense: Omit<Expense, "id" | "created_at" | "updated_at">
): Promise<Expense> {
  const [result] = await db("expenses")
    .insert({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    })
    .returning("*");

  // Convert amount string to number
  return {
    ...result,
    amount: parseFloat(result.amount),
  };
}

// Update expense
export async function updateExpense(
  id: number,
  expense: Omit<Expense, "id" | "created_at" | "updated_at">
): Promise<Expense | null> {
  const [result] = await db("expenses")
    .where("id", id)
    .update({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      updated_at: db.fn.now(),
    })
    .returning("*");

  if (!result) return null;

  // Convert amount string to number
  return {
    ...result,
    amount: parseFloat(result.amount),
  };
}

// Delete expense
export async function deleteExpense(id: number): Promise<boolean> {
  const deletedCount = await db("expenses").where("id", id).del();
  return deletedCount > 0;
}

// Get total amount of all expenses
export async function getTotalAmount(): Promise<number> {
  const result = await db("expenses").sum("amount as total").first();
  return parseFloat(result?.total || "0");
}

// Get expenses by category
export async function getExpensesByCategory(
  category: string
): Promise<Expense[]> {
  const expenses = await db("expenses")
    .select(
      "id",
      "description",
      "amount",
      "category",
      "date",
      "created_at",
      "updated_at"
    )
    .where("category", category)
    .orderBy("date", "desc")
    .orderBy("created_at", "desc");

  // Convert amount strings to numbers
  return expenses.map((expense) => ({
    ...expense,
    amount: parseFloat(expense.amount),
  }));
}

// Get expenses by date range
export async function getExpensesByDateRange(
  startDate: string,
  endDate: string
): Promise<Expense[]> {
  const expenses = await db("expenses")
    .select(
      "id",
      "description",
      "amount",
      "category",
      "date",
      "created_at",
      "updated_at"
    )
    .whereBetween("date", [startDate, endDate])
    .orderBy("date", "desc")
    .orderBy("created_at", "desc");

  // Convert amount strings to numbers
  return expenses.map((expense) => ({
    ...expense,
    amount: parseFloat(expense.amount),
  }));
}

// Get all unique categories
export async function getCategories(): Promise<string[]> {
  const result = await db("expenses").distinct("category").orderBy("category");
  return result.map((row: any) => row.category);
}

// Get expenses grouped by category for chart
export async function getExpensesByCategoryChart(): Promise<{category: string, total: number}[]> {
  const result = await db("expenses")
    .select("category")
    .sum("amount as total")
    .groupBy("category")
    .orderBy("total", "desc");

  return result.map((row: any) => ({
    category: row.category,
    total: parseFloat(row.total || "0")
  }));
}

// Get monthly expense trends for chart
export async function getMonthlyExpenseTrends(): Promise<{month: string, total: number}[]> {
  const result = await db("expenses")
    .select(db.raw("TO_CHAR(date, 'YYYY-MM') as month"))
    .sum("amount as total")
    .groupBy(db.raw("TO_CHAR(date, 'YYYY-MM')"))
    .orderBy("month", "asc");

  return result.map((row: any) => ({
    month: row.month,
    total: parseFloat(row.total || "0")
  }));
}


// Close database connection
export async function closeDatabase() {
  await db.destroy();
}
