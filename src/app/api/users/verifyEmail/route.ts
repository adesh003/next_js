import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig"
import bcrypt from "bcryptjs";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json()
        const { userId, token } = reqBody
        console.log(token);
      const user = await User.findOne({verifyToken: token, 
        verifyTokenExpiry: {$gt: Date.now()}})

        if (!user) {
            return NextResponse.json({message:"Invalid or expired token"},
            {status:400})
        }
        console.log(user)
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message:"Email verified successfully, you can now login"},
        {status:200}) 
    } catch (error:any) {
        return NextResponse.json({message:"Internal server error",
            error: error.message
        },
        {status:500})

    }
}
