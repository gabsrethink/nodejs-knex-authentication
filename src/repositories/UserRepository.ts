import knex from '../database/index';
import bcrypt from 'bcrypt';

export async function register(name: string, email: string, password: string) {
  try {
    password = await bcrypt.hash(password, 8);
    const results = await knex('users').insert({ name, email, password });
    return await results;
  } catch (error) {
    throw error;
  }
}

export async function getUser(email: string) {
  try {
    const user = await knex('users').first('*').where({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

export default { register, getUser };
