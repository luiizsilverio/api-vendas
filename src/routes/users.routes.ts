import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'

import uploadConfig from '../config/upload'
import UsersController from '../controllers/UsersController'
import isAuthenticated from '../middlewares/isAuthenticated'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const controller = new UsersController()
const avatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.get('/', isAuthenticated, controller.index)

usersRouter.post('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  },
    { abortEarly: false }
  ),
  controller.create
)

usersRouter.patch('/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update
)

export default usersRouter