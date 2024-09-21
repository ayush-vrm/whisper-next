import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not authenticated"
        },{status: 401})
    }

    const userId = user._id;
    const{acceptMessages} =  await request.json();

    try{
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new: true}
        )

        if(!updatedUser){
            return Response.json({
                success: false,
                message: "Failed to update the user "
            },{status: 401})
        }

        return Response.json({
            success: true,
            message: "Message accepted status updated successfull",
            updatedUser,
        },{status: 200})
    }
    catch(error){
        console.log("Failed to update user status to accpt message");
        return Response.json({
            success: false,
            message: "Failed to update user status to accpt message"
        },{status: 500})
    }
}


export async function GET(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not authenticated"
        },{status: 401})
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if(!foundUser){
            return Response.json({
                success: false,
                message: "Failed to find the user "
            },{status: 404})
        }

        return Response.json({
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessage
            },{status: 200})
    } 
    catch (error) {
        console.error("Error in getting message acceptance status", error);
        return new Response(
              JSON.stringify({
              success: false,
              message: "Error in getting message acceptance status",
            }),
            { status: 500 }
          );
    }
}