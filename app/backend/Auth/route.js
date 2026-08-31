import User from "../db/userSchema";
import connectDb from "../db/db";
import bcrypt from "bcrypt"

export async function POST(req) {
    try {
        
    const body = await req.json()
    await connectDb()

    const check = await User.findOne({
        email:body.email
    })
    if(check){
        return Response.json({
            success:false,
            ans:'email already exist',
            
        },{
            status:409
        })
    }
const hashed = await bcrypt.hash(body.password,12)
    const data = await User.create({
        name:body.name,
        email:body.email,
        passwordHash:hashed,
        

    })

    return Response.json({
        success:true,
        message:'user created successfully'
    },{
        status:200
    })
    } catch (error) {
        console.log('its form usersjs',error)

        if (error.code === 11000) {
    return Response.json(
        {
            success: false,
            message: "Email already exists"
        },
        {
            status: 409
        }
    );
}
        return Response.json({
            success:false,
            message:'something went wrong'
        },{
            status:500
        })
    }
}