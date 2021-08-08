import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '@/services/users/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { email } = req.body

    const SendForgotPasswordEmail = new SendForgotPasswordEmailService()

    await SendForgotPasswordEmail.execute( email )

    return resp.status(204).json() // 204 = No Content
  }
}