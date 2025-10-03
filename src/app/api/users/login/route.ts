import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        console.log(reqBody)
        const {email,password} = reqBody
        // check user exist or not
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:"User does not exist"
            },
            {status:400})

        }

        // compare password
        const validPassword= await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                error:"Invalid password"
            },
            {status:400})
        }

        // create token data 
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SCRETE!, { expiresIn: "2d" })

      const response = NextResponse.json({
        message:"Login successful",
        success:true,
      })
      response.cookies.set("token" , token,{
        httpOnly:true,
     
      })
      return response



    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 }
        )
    }
}