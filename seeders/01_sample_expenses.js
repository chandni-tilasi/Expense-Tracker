// Knex seeder: Sample expenses data
export async function seed(knex) {
  await knex("expenses").del();
  const today = new Date();

  // Helper function to get date N days ago
  const getDateDaysAgo = (days) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
  };

  await knex("expenses").insert([
    {
      description: "Morning coffee",
      amount: 3.5,
      category: "Food",
      date: getDateDaysAgo(0),
    },
    {
      description: "Bus ticket",
      amount: 2.75,
      category: "Transportation",
      date: getDateDaysAgo(0),
    },
    {
      description: "Sandwich lunch",
      amount: 8.95,
      category: "Food",
      date: getDateDaysAgo(0),
    },
    {
      description: "Coffee at Starbucks",
      amount: 4.5,
      category: "Food",
      date: getDateDaysAgo(1),
    },
    {
      description: "Lunch with colleagues",
      amount: 15.75,
      category: "Food",
      date: getDateDaysAgo(2),
    },
    {
      description: "Uber ride to downtown",
      amount: 12.3,
      category: "Transportation",
      date: getDateDaysAgo(1),
    },
    {
      description: "Movie tickets",
      amount: 24.0,
      category: "Entertainment",
      date: getDateDaysAgo(3),
    },
    {
      description: "Grocery shopping",
      amount: 85.4,
      category: "Food",
      date: getDateDaysAgo(4),
    },
    {
      description: "Gas for car",
      amount: 45.2,
      category: "Transportation",
      date: getDateDaysAgo(5),
    },
    {
      description: "New shirt",
      amount: 29.99,
      category: "Shopping",
      date: getDateDaysAgo(6),
    },
    {
      description: "Electricity bill",
      amount: 120.5,
      category: "Bills",
      date: getDateDaysAgo(7),
    },
    {
      description: "Phone bill",
      amount: 85.0,
      category: "Bills",
      date: getDateDaysAgo(13),
    },
    {
      description: "Internet bill",
      amount: 65.0,
      category: "Bills",
      date: getDateDaysAgo(23),
    },
    {
      description: "Doctor visit",
      amount: 150.0,
      category: "Healthcare",
      date: getDateDaysAgo(8),
    },
    {
      description: "Gym membership",
      amount: 49.99,
      category: "Healthcare",
      date: getDateDaysAgo(12),
    },
    {
      description: "Medication",
      amount: 25.0,
      category: "Healthcare",
      date: getDateDaysAgo(24),
    },
    {
      description: "Online course",
      amount: 199.99,
      category: "Education",
      date: getDateDaysAgo(9),
    },
    {
      description: "Books from Amazon",
      amount: 45.6,
      category: "Education",
      date: getDateDaysAgo(14),
    },
    {
      description: "Flight to NYC",
      amount: 450.0,
      category: "Travel",
      date: getDateDaysAgo(10),
    },
    {
      description: "Hotel booking",
      amount: 180.0,
      category: "Travel",
      date: getDateDaysAgo(10),
    },
    {
      description: "Concert tickets",
      amount: 120.0,
      category: "Entertainment",
      date: getDateDaysAgo(15),
    },
    {
      description: "Netflix subscription",
      amount: 15.99,
      category: "Entertainment",
      date: getDateDaysAgo(18),
    },
    {
      description: "Streaming service",
      amount: 12.99,
      category: "Entertainment",
      date: getDateDaysAgo(28),
    },

    {
      description: "Birthday gift",
      amount: 75.0,
      category: "Shopping",
      date: getDateDaysAgo(22),
    },
    {
      description: "Car maintenance",
      amount: 200.0,
      category: "Transportation",
      date: getDateDaysAgo(16),
    },
    {
      description: "Parking fee",
      amount: 8.0,
      category: "Transportation",
      date: getDateDaysAgo(20),
    },
    {
      description: "Taxi ride",
      amount: 18.5,
      category: "Transportation",
      date: getDateDaysAgo(25),
    },

    // Other expenses
    {
      description: "Haircut",
      amount: 35.0,
      category: "Other",
      date: getDateDaysAgo(21),
    },
    {
      description: "Office supplies",
      amount: 32.4,
      category: "Other",
      date: getDateDaysAgo(26),
    },

    {
      description: "Weekend groceries",
      amount: 95.3,
      category: "Food",
      date: getDateDaysAgo(17),
    },
    {
      description: "Coffee beans",
      amount: 18.5,
      category: "Food",
      date: getDateDaysAgo(19),
    },
    {
      description: "Weekend brunch",
      amount: 28.75,
      category: "Food",
      date: getDateDaysAgo(27),
    },
  ]);
}
