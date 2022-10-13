import UserRepository from '../repositories/UserRepository';

export async function register(name: string, email: string, password: string) {
  try {
    return await UserRepository.register(name, email, password);
  } catch (error) {
    console.log(error);
  }
}

export async function login(email: string, password: string) {
  try {
    return await UserRepository.login(email, password);
  } catch (error) {
    console.log(error);
  }
}
