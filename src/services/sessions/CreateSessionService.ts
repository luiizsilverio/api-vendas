import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

import { UsersRepository } from "../../repositories/UsersRepository"
import User from "../../entities/User"
import AppError from "../../errors/AppError"
import auth from '../../config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const repository = getCustomRepository(UsersRepository)
    const user = await repository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail ou senha incorreto(s)', 401)
    }

    // compara uma senha normal com outra criptografada
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha incorreto(s)', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: String(user.id),
      expiresIn: auth.jwt.expiresIn
    })

    delete user.password
    return { user, token }
  }
}

export default CreateSessionService