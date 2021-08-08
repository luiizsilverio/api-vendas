import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../services/users/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { email } = req.body

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService()

    await sendForgotPasswordEmail.execute( email )

    return resp.status(204).json() // 204 = No Content
  }
}