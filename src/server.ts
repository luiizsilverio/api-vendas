import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
const cowsay = require('cowsay')

import "./database"
import routes from './routes'
import AppError from './errors/AppError'
import { errors } from 'celebrate'
import uploadConfig from './config/upload'

const app = express()

app.use(cors())
app.use(express.json())

// com isso, se acessarmos localhost:3333/files/nome do arquivo, mostra no navegador
app.use('/files', express.static(uploadConfig.directory))

app.use(routes)
app.use(errors())

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
  console.log(
    cowsay.say({text: 'Servidor rodando na porta 3333'})
  )
})