import sequelize from "../db/sequelize/models/index";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";

const User = sequelize.models['users'];
const Role = sequelize.models['roles'];
const Op = sequelize.Sequelize.Op;


export const signup = (req: Request, res: Response) => {
  // Save User to Database
  User.create({
    phone: req.body.phone,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user: any )=> {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles: any) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req: Request, res: Response) => {
  User.findOne({
    where: {
      phone: req.body.phone
    }
  })
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });

      const authorities: Array<string> = [];
      user.getRoles().then((roles: any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          name: user.name,
          phone: user.phone,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err.message });
    });
};