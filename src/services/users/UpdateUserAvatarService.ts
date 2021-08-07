import { getCustomRepository } from "typeorm";
import path from 'path'
import fs from 'fs'

import User from "@/entities/User"
import { UsersRepository } from "../../repositories/UsersRepository"
import AppError from "../../errors/AppError"
import uploadConfig from '../../config/upload'

interface IRequest {
  user_id: string
  filename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const repository = getCustomRepository(UsersRepository)

    const user = await repository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    // Se já tiver avatar, apaga da pasta
    if (user.avatar) {
      const avatarPath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarExists = await fs.promises.stat(avatarPath)

      if (userAvatarExists) {
        await fs.promises.unlink(avatarPath)
      }
    }

    user.avatar = filename

    await repository.save(user)
    return user
  }
}

export default UpdateUserAvatarService