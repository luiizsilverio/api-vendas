import { Request, Response } from 'express'
import ListUsersService from '../services/users/ListUsersService'
import CreateUserService from '../services/users/CreateUserService'

export default class UsersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listUsers = new ListUsersService()
    const user = await listUsers.execute()
    return resp.json(user)
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email, password } = req.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return resp.json(user)
  }
}