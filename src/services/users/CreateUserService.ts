import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UsersRepository } from "../../repositories/UsersRepository"
import User from "../../entities/User"
import AppError from "../../errors/AppError"

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository)
    const emailExists = await repository.findByEmail(email)

    if (emailExists) {
      throw new AppError('E-mail já está sendo utilizado')
    }

    const hashedPassword = await  hash (password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPassword
    })

    const newUser = await repository.save(user)
    delete newUser.password
    return newUser
  }
}
export default CreateUserService