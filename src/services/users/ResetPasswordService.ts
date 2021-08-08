import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'

import { UserTokensRepository } from "../../repositories/UserTokensRepository"
import { UsersRepository } from "@/repositories/UsersRepository";
import AppError from "../../errors/AppError"

interface IRequest {
  token: string
  password: string
}

// Serviço de envio de e-mail para recuperação de senha
class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User Token does not exists')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('Usuário não cadastrado')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2) // até 2 horas

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado')
    }

    user.password = await hash(password, 8)
  }
}

export default ResetPasswordService