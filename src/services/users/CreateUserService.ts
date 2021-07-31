import { getCustomRepository } from "typeorm";
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

    const user = repository.create({
      name,
      email,
      password
    })

    const newUser = await repository.save(user)
    return newUser
  }
}
export default CreateUserService