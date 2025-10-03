import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";

export const getDateFromToken = (req: NextRequest) => {
    try {
       const token=  req.cookies.get("token")?.value || ''
       const decodeToken:any = jwt.verify(token, process.env.TOKEN_SCRETE!)
        return decodeToken.id;
        
    } catch (error:any) {
        console.error("Error getting date from token:", error);
        return null;
    }
}