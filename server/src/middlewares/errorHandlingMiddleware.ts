import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiErrors';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(parseInt(err.name)).json({message: err.message})
    }
    return res.status(500).json({message:'Unexpected error'})
}