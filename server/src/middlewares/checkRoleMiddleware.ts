import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkRoleMiddleware = (role: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token: string = req.headers.authorization!.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY!);
      if ((decoded as any).role !== role) {  // Добавить роль в юзера и потом пробывать с этим взаимодействовать
        return res.status(403).json({message: "No access"})
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Not authorized' });
    }
  };
};
