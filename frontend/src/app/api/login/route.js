
import { User } from "../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'; 

export async function POST(req)
{
    
    // step 1
    const {email, password}=await req.json();

    try {
        const user=await User.findOne({
            email:email
        })

        if(user==null){
            throw new Error("user not found")
        }

        // step 2
        const matched=bcrypt.compareSync(password, user.password)
        if(!matched){
            throw new Error("password not matching")
        }

        // step3

        const token=jwt.sign({
            _id:user._id,
            name:user.name
        }, process.env.JWT_TOKEN,  { expiresIn: '7d' })
        const response= NextResponse.json({
            message:"user loged in",
            success:true
        })

        response.cookies.set({
      name: 'loginToken',                // cookie name your middleware expects
      value: token,
      httpOnly: true,                    // recommended
      path: '/',                         // IMPORTANT: cookie sent on all routes
      sameSite: 'lax',                   // or 'none' + secure for cross-site flows
      secure: process.env.NODE_ENV === 'production', // do not set secure in local http
      maxAge: 60 * 10           // 7 days in seconds
    })
        console.log(token)
        
        // return NextResponse.json(user,{
        //     message:"success"
        // })
        return response

    } catch (error) {
        return NextResponse.json({
            message:error.message,
            success:false 
        })
    }
    
}