import User from "../../db/userSchema";
import connectDb from "../../db/db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req) {
    try {
        
    const body = await req.json()

    await connectDb()
    const find = await User.findOne({
        email:body.email
    })
    if(!find){
        return Response.json({
            message:'this email is not avilable'
        },
    {
        status:401
    }
    )
    }

    const passwordCheck= await bcrypt.compare(body.password,find.passwordHash)
    if(!passwordCheck){
        return Response.json({
            message:'wrong password '
        },
    {
        status:401
    })
    }

const token = jwt.sign({
    id:find._id,
    role:find.role
},process.env.JWT_SECRET)

if(!token){
    return Response.json({
        message:'token is not valid'
    },
{
    status:401
})
}

const response = Response.json({
    status:200,
    message:'user find successfully'
})

response.cookies.set('token',token,{
    httpOnly:true
})

return response
    } catch (error) {
        return Response.json({
            success:false,
            message:'user not find '
        })
    }

}