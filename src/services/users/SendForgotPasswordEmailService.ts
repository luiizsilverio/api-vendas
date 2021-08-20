import { getCustomRepository } from "typeorm";
import path from "path";
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

    const { token } = await userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..', '..',
      'views',
      'forgot_password.hbs'
    )


    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'Recuperação de Senha [API Vendas]',
      // body: `Solicitação de redefinição de senha recebida: ${token?.token}`
      templateData: {
        templateFile: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}` // front-end
        }
      }
    })

  }
}

export default SendForgotPasswordEmailService