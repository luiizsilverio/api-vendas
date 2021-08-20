import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import OrdersController from '../controllers/OrdersController'
import isAuthenticated from '../middlewares/isAuthenticated'

const ordersRouter = Router()
const controller = new OrdersController()

ordersRouter.use(isAuthenticated)

ordersRouter.get('/:id', //celebrate({ [Segments.PARAMS]: {
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    }
  }),
  controller.show
)

ordersRouter.post('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required()
    },
  },
    { abortEarly: false }
  ),
  controller.create
)

export default ordersRouter