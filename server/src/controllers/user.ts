import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import ApiError from "../errors/ApiErrors";
import sequelize from '../db/sequelize/models/index';

const generateJwt = (id: number, phone: string, name: string) => {
   return jwt.sign(
       {id, phone, name }, 
       process.env.SECRET_KEY, 
       {expiresIn: '2h'})
}

export default class UserController {

    registration =  async (req: Request, res: Response):Promise<any> => {
            const {name, password, phone} = req.body

            if(!phone || !password) {
                console.log("Incorrect password or phone");                 
                return console.log(req.body);
            }
            const candidate = await sequelize.models['User'].findOne({where: {phone}})
            if(candidate) {
                return console.log("User with this phone already exist");
                
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await sequelize.models['User'].create({phone, name, password:hashPassword})
            const token = generateJwt(user.id, user.phone, user.name )
            return res.json({token})
    }

    login =  async (req: Request, res: Response, next: NextFunction):Promise<any> =>  {
        const {phone, password} = req.body
        const user = await sequelize.models['User'].findOne({where:{phone}})
        if (!user) {
            return next(ApiError.internal('User with this phone not found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Incorrect password'))
        }
        const token = generateJwt(user.id, user.phone, user.name)
        return res.json({token})
    }

    check =  async (req: Request, res: Response, next: NextFunction):Promise<any> => {
        const token = generateJwt((req as any).user.id, (req as any).user.phone, (req as any).user.name)
        return res.json({token})
    }

}
