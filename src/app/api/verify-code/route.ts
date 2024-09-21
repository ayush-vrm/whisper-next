import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request){
    await dbConnect();

    try{
        const { username, code} = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({username: decodedUsername});
        if(!user){
            return Response.json({
                success: false,
                message: "User not found",
            },{status: 500})
        }

        const isValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry )> new Date();

        if(isValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "Account verified successfully"
            },{status: 200})
        }

        else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verify Code expired, signup again"
            },{status: 400})
        }

        else{
            return Response.json({
                success: false,
                message: "Incorrect code, check it again"
            },{status: 400})
        }

    }
    catch(error){
        console.error("Error veeifying user", error);
        return Response.json({
            success: false,
            message: "Error veeifying user"
        },{status: 500})
    }
}

