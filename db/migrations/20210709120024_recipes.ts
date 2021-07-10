import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email").notNullable().unique();
      table.string("salt");
      table.string("hash");
    })
    .createTable("custom_groups", (table) => {
      table.increments("id").primary;
      table.string("name").notNullable();
    })
    .createTable("recipes", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.string("name").notNullable();
      table.specificType("steps", "text ARRAY").defaultTo("{}");
      table.text("description");
      table.integer("serves").unsigned();
      table.string("image");
    })
    .createTable("custom_grouped_recipes", (table) => {
      table.integer("recipe_id").unsigned().notNullable();
      table.integer("custom_group_id").unsigned().notNullable();
      table.foreign("recipe_id").references("id").inTable("recipes");
      table
        .foreign("custom_group_id")
        .references("id")
        .inTable("custom_groups");
      table.primary(["recipe_id", "custom_group_id"]);
    })
    .createTable("ingredients", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
    })
    .createTable("recipe_ingredients", (table) => {
      table.integer("recipe_id").unsigned().notNullable();
      table.integer("ingredients_id").unsigned().notNullable();
      table.foreign("recipe_id").references("id").inTable("recipes");
      table.foreign("ingredients_id").references("id").inTable("ingredients");
      table.integer("number").unsigned();
      table.string("unit");
      table.text("note");
      table.primary(["recipe_id", "ingredients_id"]);
    })
    .createTable("tags", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
    })
    .createTable("recipe_tags", (table) => {
      table.integer("recipe_id").unsigned().notNullable();
      table.integer("tag_id").unsigned().notNullable();
      table.foreign("recipe_id").references("id").inTable("recipes");
      table.foreign("tag_id").references("id").inTable("tags");
      table.primary(["recipe_id", "tag_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("cities")
    .dropTableIfExists("weather")
    .dropTable("users")
    .dropTable("recipes")
    .dropTable("custom_groups")
    .dropTable("custom_grouped_recipes")
    .dropTable("ingredients")
    .dropTable("recipe_ingredients")
    .dropTable("tags")
    .dropTable("recipe_tags");
}
