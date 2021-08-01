import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import SessionsController from '../controllers/SessionsController'

const sessionsRouter = Router()
const controller = new SessionsController()

sessionsRouter.post('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  },
    { abortEarly: false }
  ),
  controller.create
)

export default sessionsRouter