import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import ProductsController from '../controllers/ProductsController'

const productsRouter = Router()

const controller = new ProductsController()

productsRouter.get('/', controller.index)

productsRouter.get('/:id', //celebrate({ [Segments.PARAMS]: {
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    }
  }),
  controller.show
)

productsRouter.post('/',  //celebrate({ [Segments.BODY]: {
  celebrate({
    body: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },
  },
    { abortEarly: false }
  ),
  controller.create
)

productsRouter.put('/:id',
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    },
    body: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },
  },
    { abortEarly: false }
  ),
  controller.update
)

productsRouter.delete('/:id',
  celebrate({
    params: {
      id: Joi.string().uuid().required()
    }
  }),
  controller.delete
)

export default productsRouter