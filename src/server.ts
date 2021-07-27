import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import "./database"
import routes from './routes'
import AppError from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

// Middleware que intercepta os erros
app.use((
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return resp.status(error.statusCode)
      .json({
        status: 'error',
        message: error.message
      })
  }

  return resp.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})