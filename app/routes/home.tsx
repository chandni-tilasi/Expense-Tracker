import type { Route } from "./+types/home";
import {
  Form,
  Link,
  useLoaderData,
  useActionData,
  useNavigation,
} from "react-router";
import { useEffect, useState } from "react";
import ExpensePieChart from "../components/ExpensePieChart";
import {
  getAllExpenses,
  getTotalAmount,
  deleteExpense,
  getExpensesByCategoryChart,
  type Expense,
} from "../../lib/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Expense Tracker" },
    { name: "description", content: "Track your daily expenses" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  let expenses: Expense[];

  if (category && category !== "all") {
    const { getExpensesByCategory } = await import("../../lib/db.server");
    expenses = await getExpensesByCategory(category);
  } else if (startDate && endDate) {
    const { getExpensesByDateRange } = await import("../../lib/db.server");
    expenses = await getExpensesByDateRange(startDate, endDate);
  } else {
    expenses = await getAllExpenses();
  }

  const totalAmount = await getTotalAmount();
  const { getCategories } = await import("../../lib/db.server");
  const categories = await getCategories();
  
  // Get chart data
  const categoryChartData = await getExpensesByCategoryChart();

  return { 
    expenses, 
    totalAmount, 
    categories, 
    categoryChartData
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const id = parseInt(formData.get("id") as string);
    if (id) {
      await deleteExpense(id);
      return { success: true, message: "Expense deleted successfully" };
    }
  }

  return { success: false, message: "Invalid action" };
}

export default function Home() {
  const { expenses, totalAmount, categories, categoryChartData } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [showMessage, setShowMessage] = useState(true);

  const isSubmitting = navigation.state === "submitting";

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (actionData?.message && actionData?.success) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [actionData]);

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-white shadow-xl rounded-2xl border"
          style={{ borderColor: "#f1f1f1" }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold" style={{ color: "#014f99" }}>
                Expense Tracker
              </h1>
              <Link
                to="/add"
                className="text-white font-medium py-2 px-6 rounded-xl transition duration-150 ease-in-out shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#014f99" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#01417d")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#014f99")
                }
              >
                Add New Expense
              </Link>
            </div>

            {/* Total Amount Display */}
            <div
              className="rounded-xl p-6 mb-6 shadow-sm border"
              style={{ backgroundColor: "#f1f1f1", borderColor: "#f1f1f1" }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#014f99" }}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: "#014f99" }}
                  >
                    Total Expenses
                  </h3>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "#222222" }}
                  >
                    ₹{totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="mb-8">
              {/* Category Pie Chart */}
              <div
                className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl mx-auto"
                style={{ borderColor: "#f1f1f1" }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#014f99" }}
                >
                  Expenses by Category
                </h3>
                <ExpensePieChart data={categoryChartData} />
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <Form method="get" className="flex flex-wrap gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#014f99" }}
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-lg shadow-sm sm:text-sm bg-white border"
                    style={{ borderColor: "#f1f1f1", color: "#000000" }}
                    onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                    onBlur={(e) => (e.target.style.borderColor = "#f1f1f1")}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category: string) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#014f99" }}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="block w-full rounded-lg shadow-sm sm:text-sm bg-white border"
                    style={{ borderColor: "#f1f1f1", color: "#000000" }}
                    onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                    onBlur={(e) => (e.target.style.borderColor = "#f1f1f1")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#014f99" }}
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="block w-full rounded-lg shadow-sm sm:text-sm bg-white border"
                    style={{ borderColor: "#f1f1f1", color: "#000000" }}
                    onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                    onBlur={(e) => (e.target.style.borderColor = "#f1f1f1")}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="text-white font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: "#014f99" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.backgroundColor =
                        "#01417d")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.backgroundColor =
                        "#014f99")
                    }
                  >
                    Filter
                  </button>
                </div>
              </Form>
            </div>

            {/* Success/Error Messages */}
            {actionData?.message && showMessage && (
              <div
                className={`mb-4 p-4 rounded-lg transition-opacity duration-300 ${
                  actionData.success
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{actionData.message}</span>
                  {actionData.success && (
                    <button
                      onClick={() => setShowMessage(false)}
                      className="ml-4 text-green-600 hover:text-green-800 font-medium"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Expenses Table */}
            <div
              className="overflow-hidden shadow-xl ring-1 md:rounded-xl"
              style={{ borderColor: "#f1f1f1" }}
            >
              <table
                className="min-w-full divide-y"
                style={{ borderColor: "#f1f1f1" }}
              >
                <thead style={{ backgroundColor: "#f1f1f1" }}>
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#014f99" }}
                    >
                      Description
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#014f99" }}
                    >
                      Amount
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#014f99" }}
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#014f99" }}
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#014f99" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y"
                  style={{ borderColor: "#f1f1f1" }}
                >
                  {expenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center"
                        style={{ color: "#014f99" }}
                      >
                        No expenses found.{" "}
                        <Link
                          to="/add"
                          className="font-medium"
                          style={{ color: "#014f99" }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.color = "#01417d")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.color = "#014f99")
                          }
                        >
                          Add your first expense
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          style={{ color: "#222222" }}
                        >
                          {expense.description}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-semibold"
                          style={{ color: "#222222" }}
                        >
                          ₹{expense.amount.toFixed(2)}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: "#222222" }}
                        >
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                            style={{
                              backgroundColor: "#f1f1f1",
                              color: "#014f99",
                              borderColor: "#f1f1f1",
                            }}
                          >
                            {expense.category}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm"
                          style={{ color: "rgb(64, 64, 64)" }}
                        >
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link
                              to={`/edit/${expense.id}`}
                              className="font-medium transition-colors"
                              style={{ color: "#014f99" }}
                              onMouseEnter={(e) =>
                                ((e.target as HTMLElement).style.color =
                                  "#01417d")
                              }
                              onMouseLeave={(e) =>
                                ((e.target as HTMLElement).style.color =
                                  "#014f99")
                              }
                            >
                              Edit
                            </Link>
                            <Form method="post" className="inline">
                              <input
                                type="hidden"
                                name="intent"
                                value="delete"
                              />
                              <input
                                type="hidden"
                                name="id"
                                value={expense.id}
                              />
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="disabled:opacity-50 font-medium transition-colors cursor-pointer"
                                style={{ color: "#dc2626" }}
                                onMouseEnter={(e) =>
                                  ((e.target as HTMLElement).style.color =
                                    "#b91c1c")
                                }
                                onMouseLeave={(e) =>
                                  ((e.target as HTMLElement).style.color =
                                    "#dc2626")
                                }
                                onClick={(e) => {
                                  if (
                                    !confirm(
                                      "Are you sure you want to delete this expense?"
                                    )
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                {isSubmitting ? "Deleting..." : "Delete"}
                              </button>
                            </Form>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
