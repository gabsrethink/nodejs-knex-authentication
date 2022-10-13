import knex from '../database/index';
import bcrypt from 'bcrypt';

const saltRounds = 8;

export async function register(name: string, email: string, password: string) {
  try {
    password = await bcrypt.hash(password, saltRounds);
    const results = await knex('users').insert({ name, email, password });
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await knex('users').first('*').where({ email });
    if (!user) {
      console.log('No such user found:');
    } else {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        return console.log('Deu bom!');
      } else {
        console.log('Incorrect password for user:', email);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default { register, login };
