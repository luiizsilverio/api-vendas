import { Request, Response } from 'express'
import UpdateUserAvatarService from '../services/users/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(req: Request, resp: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()

    const user = await updateAvatar.execute({
      user_id: req.user.id,
      filename: req.file.filename
    })

    return resp.json(user)
  }
}