
import { jwtVerify } from "jose"
export async function DELETE(request){
const cookei = request.headers.get('cookie')
const token = cookei.value.split("=")[1]

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const check = await jwtVerify(token,secret)

console.log(check)

return Response.json({
    success:true
})

}