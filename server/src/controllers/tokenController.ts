import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { MAX_AGE } from "../constants/api";
import ApiError from "../errors/ApiErrors";
import { deleteToken, generateAccessToken, generateRefreshToken } from "../utils/jwtHelpers";


export default class TokenController {
async refresh(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { refreshToken } = req.cookies;

    const userInfo = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
    if (!refreshToken) {
      return next(ApiError.forbidden());
    }

    res.cookie('refreshToken', refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });

    return res.json({
      accessToken: generateAccessToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).phone,
        (userInfo as any).roles,
        (userInfo as any).driver_info,
      ),
      refreshToken: generateRefreshToken(
        (userInfo as any).id,
        (userInfo as any).name,
        (userInfo as any).phone,
        (userInfo as any).roles,
        (userInfo as any).driver_info,
      ),
    });
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token: string = req.headers.authorization!.split(' ')[1];

    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);

    const accessToken = generateAccessToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).phone,
      (userInfo as any).roles,
    );
    const refreshToken = generateRefreshToken(
      (userInfo as any).id,
      (userInfo as any).name,
      (userInfo as any).phone,
      (userInfo as any).roles,
    );
    res.cookie('refreshToken', refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });
    return res.json({ accessToken, refreshToken });
  }

  async delToken(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.cookies;
    deleteToken(req.body, refreshToken);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  }
}