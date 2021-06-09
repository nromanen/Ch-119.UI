import { NextFunction, Request, Response } from "express";
import * as  jwt from "jsonwebtoken";
import sequelize from '../db/sequelize/models/index';

const User = sequelize.models['users'];

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.headers.authorization!.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Not authorized"
      });
    }
    (req as any).userId = (decoded as any).id;
    next();
  });
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  User.findByPk((req as any).userId).then((user: any) => {
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isDriver = (req: Request, res: Response, next: NextFunction) => {
  User.findByPk((req as any).userId).then((user: any) => {
    user.getRoles().then((roles: any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "driver") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Driver Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDriver: isDriver
};
export default authJwt;