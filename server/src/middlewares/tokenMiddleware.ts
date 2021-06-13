import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokens } from '../utils/jwtHelpers';
import ApiError from '../errors/ApiErrors';
// import redisClient from '../redisConnect';


export const authMiddleware = (req: any, res: Response, next: NextFunction) => {

  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token: string = req.headers.authorization!.split(' ')[1]

    if (!token) {
      return ApiError.internal('Not authorized')
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!)
    req.user = decoded
    next()
  } catch (error) {
    return ApiError.forbidden('Not authorized')
  }
}

export const refreshTokenMiddleware = (req: any, res: Response, next: NextFunction) => {

  const {refreshToken} = req.body
  try {
    if (refreshToken == null) {
      return ApiError.internal('Not authorized')
    }
    if (!refreshTokens.includes(refreshToken)) {
      return ApiError.forbidden('Not authorized')
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!)
    req.user = decoded
    
    // redisClient.get((decoded as any).id.toString(), (err, data) => {
    //     if (err) return ApiError.forbidden('Not authorized')

    //     if (data === null) return ApiError.forbidden('Not authorized')
    //     if (JSON.parse(data).token != refreshToken) return ApiError.forbidden('Not authorized')
        
        next() 
    }  catch (error) {
      return ApiError.forbidden('Not authorized')
    }
  }
