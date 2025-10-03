import { NextResponse } from "next/server"; 
export async function GET(){

    try {
        const response = NextResponse.json({
            message:"logout Successful",
            succuss:true,
        })
        response.cookies.set("token" , "" ,{
            httpOnly:true , expires: new Date(0),
        })
        return response
    } catch (error) {
        console.log("Logout failed",error)
        return NextResponse.json({error:error.message}, {status:500})
        {status :500}
    }
}