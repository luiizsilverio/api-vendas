import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import isAuthenticated from '../middlewares/isAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const controller = new ProfileController()

profileRouter.use(isAuthenticated)

profileRouter.get('/', controller.show)

profileRouter.put('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        })
    },
  },
    { abortEarly: false }
  ),
  controller.update
)

export default profileRouter