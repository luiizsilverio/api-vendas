import { getCustomRepository } from "typeorm";
import { compare, hash } from 'bcryptjs'
import { UsersRepository } from "../../repositories/UsersRepository"
import User from "../../entities/User";
import AppError from "../../errors/AppError";

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository)

    const user = await repository.findById(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userEmail = await repository.findByEmail(email)

    if (userEmail && userEmail.id !== user_id) {
      throw new AppError('Já existe um usuário com esse e-mail')
    }

    if (password && !old_password) {
      throw new AppError('Senha anterior não foi informada')
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password)

      if (!checkPassword) {
        throw new AppError('Senha anterior não confere')
      }

      user.password = await hash(password, 8)
    }

    user.name = name
    user.email = email

    const newUser = await repository.save(user)
    delete newUser.password
    return newUser
  }
}

export default UpdateProfileService