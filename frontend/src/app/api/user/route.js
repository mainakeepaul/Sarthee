// import connectdb from "../../../helper/db.js"
import { User } from "../../../models/userModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import {connectToDB} from "@/helper/db"

export async function GET(request)
{
    connectToDB()
    let users=[]
    try {
        users= await User.find()
    } catch (error) {
        console.log("couldnt fetch users")
        console.log(error)
        return NextResponse.json({
            status:false,
            message:"couldnt find users "
        })
    }

    return NextResponse.json(users)
}

export async function POST(request)
{
    const {name , email,phoneNo, password}=await request.json()
    // create user object with user model
    let user=new User({name , email,phoneNo, password})
    try{
        // user.password=bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT))
        // const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT));

        const createUser=await user.save()

        const response= NextResponse.json(user,{
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

export function PUT()
{
    
}

export function DELETE()
{
    console.log("Delet method called")
    return NextResponse.json({
        message:"Deleted!",
        status:true
    })
    
}