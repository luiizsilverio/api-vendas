import { Router } from 'express'
import ProductsController from '../controllers/ProductsController'

const productsRouter = Router()

const controller = new ProductsController()

productsRouter.get('/', controller.index)
productsRouter.get('/:id', controller.show)
productsRouter.post('/', controller.create)
productsRouter.put('/:id', controller.update)
productsRouter.delete('/:id', controller.delete)

export default productsRouter