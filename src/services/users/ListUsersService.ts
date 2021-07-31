import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository"
import User from "src/entities/User";

class ListUsersService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UsersRepository)

    const users = await repository.find()

    return users
  }
}

export default ListUsersService