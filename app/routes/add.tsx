import type { Route } from "./+types/add";
import { redirect } from "react-router";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { createExpense } from "../../lib/db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Expense - Expense Tracker" },
    { name: "description", content: "Add a new expense" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const description = formData.get("description") as string;
  const amount = formData.get("amount") as string;
  const category = formData.get("category") as string;
  const date = formData.get("date") as string;

  // Validation
  const errors: Record<string, string> = {};

  if (!description || description.trim().length === 0) {
    errors.description = "Description is required";
  }

  if (!amount || amount.trim().length === 0) {
    errors.amount = "Amount is required";
  } else {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      errors.amount = "Amount must be a positive number";
    }
  }

  if (!category || category.trim().length === 0) {
    errors.category = "Category is required";
  }

  if (!date || date.trim().length === 0) {
    errors.date = "Date is required";
  } else {
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    if (inputDate > today) {
      errors.date = "Date cannot be in the future";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  try {
    await createExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category: category.trim(),
      date: date || new Date().toISOString().split("T")[0],
    });

    return redirect("/");
  } catch (error) {
    return {
      errors: { general: "Failed to create expense. Please try again." },
      success: false,
    };
  }
}

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
];

export default function AddExpense() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="bg-white shadow-xl rounded-2xl border"
          style={{ borderColor: "#f1f1f1" }}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold" style={{ color: "#014f99" }}>
                Add New Expense
              </h1>
              <Link
                to="/"
                className="font-medium transition-colors"
                style={{ color: "#014f99" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#01417d")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#014f99")
                }
              >
                ← Back to Expenses
              </Link>
            </div>

            <Form method="post" className="space-y-6">
              {/* General Error Message */}
              {actionData?.errors?.general && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{actionData.errors.general}</p>
                </div>
              )}

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#014f99" }}
                >
                  Description *
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm sm:text-sm bg-white border placeholder-black ${
                    actionData?.errors?.description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  style={{
                    borderColor: actionData?.errors?.description
                      ? "#dc2626"
                      : "#f1f1f1",
                    height: "48px",
                    color: "#000000",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = actionData?.errors
                      ?.description
                      ? "#dc2626"
                      : "#f1f1f1")
                  }
                  placeholder="Enter expense description"
                />
                {actionData?.errors?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {actionData.errors.description}
                  </p>
                )}
              </div>

              {/* Amount Field */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#014f99" }}
                >
                  Amount (₹) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span
                      className="sm:text-sm font-medium"
                      style={{ color: "#014f99" }}
                    >
                      ₹
                    </span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.01"
                    min="0"
                    required
                    className={`block w-full pl-7 pr-4 py-3 rounded-lg shadow-sm sm:text-sm bg-white border placeholder-black ${
                      actionData?.errors?.amount
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    style={{
                      borderColor: actionData?.errors?.amount
                        ? "#dc2626"
                        : "#f1f1f1",
                      height: "48px",
                      color: "#000000",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = actionData?.errors?.amount
                        ? "#dc2626"
                        : "#f1f1f1")
                    }
                    placeholder="0.00"
                  />
                </div>
                {actionData?.errors?.amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {actionData.errors.amount}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#014f99" }}
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm sm:text-sm bg-white border placeholder-black ${
                    actionData?.errors?.category
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  style={{
                    borderColor: actionData?.errors?.category
                      ? "#dc2626"
                      : "#f1f1f1",
                    height: "48px",
                    color: "#000000",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = actionData?.errors?.category
                      ? "#dc2626"
                      : "#f1f1f1")
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {actionData?.errors?.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {actionData.errors.category}
                  </p>
                )}
              </div>

              {/* Date Field */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#014f99" }}
                >
                  Date * (defaults to today)
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={today}
                  max={today}
                  required
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm sm:text-sm bg-white border placeholder-black ${
                    actionData?.errors?.date
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  style={{
                    borderColor: actionData?.errors?.date
                      ? "#dc2626"
                      : "#f1f1f1",
                    height: "48px",
                    color: "#000000",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#014f99")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = actionData?.errors?.date
                      ? "#dc2626"
                      : "#f1f1f1")
                  }
                />
                {actionData?.errors?.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {actionData.errors.date}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <Link
                  to="/"
                  className="font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#f1f1f1", color: "#222222" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#e5e5e5")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#f1f1f1")
                  }
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: isSubmitting ? "#0268c9" : "#014f99",
                  }}
                  onMouseEnter={(e) =>
                    !isSubmitting &&
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#01417d")
                  }
                  onMouseLeave={(e) =>
                    !isSubmitting &&
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#014f99")
                  }
                >
                  {isSubmitting ? "Adding..." : "Add Expense"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
