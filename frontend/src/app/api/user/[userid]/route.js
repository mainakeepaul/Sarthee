import { User } from "../../../../models/user.js"
import { NextResponse } from "next/server"

export async function GET(request,{params}) {
    const {userid}=await params

    try {
        const user=await User.findById(userid)

        return NextResponse.json(user,{
            message:"user found",
            success:true
        })
    } catch (error) {
        return NextResponse.json({
            message:"user not found",
            success:false
        })
    }
}

export async function POST(request,{params})
{
    const {userid}=await params
    const {name , email,phoneNo, password}=await request.json()
    // create user object with user model
    // const user=new User({name , email, password})
    try{
        const user=await User.findById(userid)

        user.name=name;
        user.email=email;
        user.phoneNo=phoneNo
        user.password=password

        const updatedUser= user.save()
        const response= NextResponse.json(updatedUser,{
         status:201,
        })
        return response
    }catch(error){
        console.log(error)
        NextResponse.json({
            status:false,
            message:"failed to create user"
        })
    }
    
}

export async function DELETE(request, {params})
{
    const {userid, title}=params
    console.log(userid)
    try {
        await User.deleteOne({
            _id:userid
        })
        return NextResponse.json({
            message:"user deleted",
            success:true
        })
    } catch (error) {
        return NextResponse.json({
            message:"error in deleting user",
            success:false
        })
    }
}