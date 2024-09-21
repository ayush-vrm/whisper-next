import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already conncted to database");
        return;
    }

    try{
       const db = await mongoose.connect(process.env.MONGODB_URL || '',  {})

    //    console.log(db);

       connection.isConnected = db.connections[0].readyState;

    //    console.log(db.connections); 

       console.log("DB connected successfully")
    }
    catch(error){

        console.log("Database connection failed", error);
        process.exit()
    }
}


export default dbConnect;