import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync("cereal25", salt);
  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      first_name: "James",
      last_name: "Debnam",
      email: "jamesdebnam@gmail.com",
      salt,
      hash,
      isAdmin: true,
    },
  ]);
}
