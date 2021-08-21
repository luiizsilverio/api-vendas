import { Request, Response } from 'express'
import ListUsersService from '../services/users/ListUsersService'
import CreateUserService from '../services/users/CreateUserService'
import { classToClass } from 'class-transformer'

export default class UsersController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const listUsers = new ListUsersService()
    // console.log(req.user.id)

    const users = await listUsers.execute()

    return resp.json(classToClass(users))
  }

  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email, password } = req.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password
    return resp.json(user)
  }
}