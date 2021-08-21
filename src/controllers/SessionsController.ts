import { Request, Response } from 'express'
import ListUsersService from '../services/users/ListUsersService'
import CreateSessionService from '../services/sessions/CreateSessionService'

export default class SessionsController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { email, password } = req.body

    const createSession = new CreateSessionService()

    const { user, token } = await createSession.execute({
      email,
      password
    })

    delete user.password
    return resp.json({ user, token })
  }
}