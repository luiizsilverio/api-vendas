import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotController = new ForgotPasswordController()
const resetController = new ResetPasswordController()

// http://localhost:3333/password/forgot
// http://localhost:3333/password/reset

passwordRouter.post('/forgot',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      email: Joi.string().email().required()
    },
  }),
  forgotController.create
)

passwordRouter.post('/reset',
  celebrate({
    body: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required()
        .valid(Joi.ref('password'))
    },
  }),
  resetController.create
)

export default passwordRouter