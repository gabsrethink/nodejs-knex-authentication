import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Gabriel Melo',
      email: 'gabriel.melo@rethink.dev',
      password: '$2b$08$3jEG0ZUfd0j/E3K/vkHy5u/mVMWPnTV98zt7fMVy.XOjiiGSHw6Qa',
    },
  ]);
}
