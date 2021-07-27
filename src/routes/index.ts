import { Router } from 'express'

const routes = Router()

routes.get('/', (req, resp) => {
  return resp.json({ message: "Curso API Rest"})
})

export default routes