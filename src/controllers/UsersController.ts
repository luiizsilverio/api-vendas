import { Request, Response } from 'express'
import ListUsersService from '../services/users/ListUsersService'
import CreateUserService from '../services/users/CreateUserService'

export default class UsersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listUsers = new ListUsersService()
    // console.log(req.user.id)

    const users = await listUsers.execute()

    return resp.json(users)
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