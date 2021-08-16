import { Router } from 'express'
import productsRouter from './products.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import passwordRouter from './password.routes'
import profileRouter from './profile.routes'
import customerRouter from './customers.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customerRouter)

export default routes