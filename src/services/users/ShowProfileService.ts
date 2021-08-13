import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository"
import User from "../../entities/User";
import AppError from "../../errors/AppError";

class ShowProfileService {
  public async execute(userId): Promise<User> {
    const repository = getCustomRepository(UsersRepository)

    const user = await repository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    // delete user.password
    return user
  }
}

export default ShowProfileService