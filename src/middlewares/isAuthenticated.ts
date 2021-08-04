import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import authConfig from '../config/auth'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string // payload = id do usuário
}

export default function isAuthenticated(
  req: Request,
  resp: Response,
  next: NextFunction
) {
	// verifica se tem cabeçalho de autorização (Bearer)
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT Token is missing", 403)
  }

  // [type, token]: type = Bearer, mas não vai ser utilizado
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret,)

    const { sub } = decodedToken as ITokenPayload

    req.user = { id: sub }

    return next()

  } catch (error) {
    throw new AppError("Invalid JWT Token", 403)
  }
}