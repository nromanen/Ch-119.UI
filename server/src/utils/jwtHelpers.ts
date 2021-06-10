import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (id: number, phone: string, name: string, roles: string[]) => {
    const accessToken = jwt.sign(
       {id, phone, name, roles}, 
       process.env.ACCESS_TOKEN_SECRET_KEY, 
       {expiresIn: '10min'})
  
       return accessToken
  }
  
export let refreshTokens: Array<string> = [];

export const refreshToken = (id: number, phone: string, name: string, roles: string[]) => {
    const refreshToken = jwt.sign(
       {id, phone, name, roles}, 
       process.env.REFRESH_TOKEN_SECRET_KEY,
       {expiresIn: '10min'})
       refreshTokens.push(refreshToken)
       return refreshToken
}

export const deleteToken = (body:any) => {
    refreshTokens = refreshTokens.filter(token => token !== body.token)
}