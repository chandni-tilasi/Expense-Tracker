export async function up(knex) {
  return knex.schema.createTable("expenses", (table) => {
    table.increments("id").primary();
    table.string("description", 255).notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.string("category", 100).notNullable();
    table.date("date").notNullable().defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("expenses");
}
