import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokens } from '../utils/jwtHelpers';


export const authMiddleware = (req: any, res: Response, next: NextFunction) => {

  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token: string = req.headers.authorization!.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Not authorized' })
  }
}

export const refreshTokenMiddleware = (req: any, res: Response, next: NextFunction) => {

  const refreshToken = req.body.token
  try {
    if (refreshToken == null) {
      return res.status(401).json({ message: 'Not authorized' })
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY!)
    req.user = decoded
    next() 
      } catch (error) {
      res.status(403).json({ message: 'Not authorized' })
    }
  }
