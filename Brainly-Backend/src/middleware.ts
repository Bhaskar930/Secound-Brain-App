import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_PASSWORD="!24435f"

export const UserMiddleWare=async(req:Request,res:Response,next:NextFunction)=>{


    const header=req.headers["authorization"];
    const decoded=jwt.verify(header as string,JWT_PASSWORD);
    if(decoded){
        //@ts-ignore
        req.userId=decoded.id;
        next();
    }else{
        res.status(403).json({
            msg:"You are Not Logged In"
        })
    }

}