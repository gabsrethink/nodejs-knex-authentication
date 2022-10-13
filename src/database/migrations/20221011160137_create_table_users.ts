import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('email');
    table.string('password');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
