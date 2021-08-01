import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/UsersRepository"
import User from "src/entities/User";

class ListUsersService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UsersRepository)

    const users = await repository.find()

    const lista = users.map(user => {
      delete user.password
      return user
    })

    return lista
  }
}

export default ListUsersService