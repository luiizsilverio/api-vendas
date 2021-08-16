import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import CustomersController from '../controllers/CustomersController'
import isAuthenticated from '../middlewares/isAuthenticated'

const  customersRouter = Router()
const controller = new CustomersController()

customersRouter.use(isAuthenticated)
customersRouter.get('/', controller.index)

customersRouter.get('/:id', //celebrate({ [Segments.PARAMS]: {
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    }
  }),
  controller.show
)

 customersRouter.post('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  },
    { abortEarly: false }
  ),
  controller.create
)

 customersRouter.put('/:id',
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    },
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  },
    { abortEarly: false }
  ),
  controller.update
)

 customersRouter.delete('/:id',
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    }
  }),
  controller.delete
)

export default customersRouter