import * as jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize/models/index';
// import redisClient from '../redisConnect';
import ApiError from '../errors/ApiErrors';
const Token = sequelize.models['tokens'];

export const generateAccessToken = (id: number, name: string, roles: string[]) => {
    const accessToken = jwt.sign(
       {id, name, roles}, 
       process.env.ACCESS_TOKEN_SECRET_KEY, 
       {expiresIn: process.env.ACCESS_TOKEN_TIME})
  
       return accessToken
  }
  
export let refreshTokens: Array<string> = [];

export const generateRefreshToken = (id: number, name: string, roles: string[]) => {

    const refreshToken = jwt.sign(
       {id, name, roles}, 
       process.env.REFRESH_TOKEN_SECRET_KEY,
       {expiresIn: process.env.REFRESH_TOKEN_TIME})
    //    redisClient.get(id.toString(), (err, data) => {
    //     if (err) ApiError.forbidden('Not authorized')

    //     redisClient.set(id.toString(), JSON.stringify(refreshToken))
    //    })
       refreshTokens.push(refreshToken)
       return refreshToken

}

export const deleteToken = (body:any, refreshToken: string) => {

    // redisClient.del(body.id.toString());

    // redisClient.set('BL_' + body.id.toString(), body.token)

    refreshTokens = refreshTokens.filter(token => token !== body.token)
    // const tokenData = Token.deleteOne({refreshToken})
    // return tokenData;
}


export const saveToken = (userId: number, refreshToken: string) => {
    const tokenData = Token.findByPk(userId)
    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        console.log(tokenData);
        
        return tokenData.save();
    }
    const token = Token.create({user: userId, refreshToken})
        return token
}