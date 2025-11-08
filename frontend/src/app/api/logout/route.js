import { NextResponse } from "next/server";

export async function POST(request) {
    const response=NextResponse.json({
        message:"logged out",
        success:true
    })

    response.cookies.set("loginToken","",{
        expires: new Date(0),
    })

    return response
}