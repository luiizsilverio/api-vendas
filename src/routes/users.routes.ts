import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UsersController from '../controllers/UsersController'
import isAuthenticated from '../middlewares/isAuthenticated'

const usersRouter = Router()
const controller = new UsersController()

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

export default usersRouter