import { getCustomRepository } from "typeorm";
import { UserTokensRepository } from "../../repositories/UserTokensRepository"
import { UsersRepository } from "../../repositories/UsersRepository";
import EtherealMail from '../../config/mail/EtherealMail'
import AppError from "../../errors/AppError"

interface IRequest {
  email: string
}

// Serviço de envio de e-mail para recuperação de senha
class SendForgotPasswordEmailService {
  public async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const token = await userTokensRepository.generate(user.id)

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`
    })
  }
}

export default SendForgotPasswordEmailService