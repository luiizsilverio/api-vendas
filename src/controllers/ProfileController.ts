import { Request, Response } from 'express'
import ShowProfileService from '../services/users/ShowProfileService'
import UpdateProfileService from '../services/users/UpdateProfileService'

export default class ProfileController {
  public async show(req: Request, resp: Response): Promise<Response> {
    const showProfile = new ShowProfileService()
    const user_id = req.user.id

    const user = await showProfile.execute(user_id)

    return resp.json(user)
  }

  public async update(req: Request, resp: Response): Promise<Response> {
    const user_id = req.user.id
    const { name, email, password, old_password } = req.body

    const updateProfile = new UpdateProfileService()

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    })

    return resp.json(user)
  }
}