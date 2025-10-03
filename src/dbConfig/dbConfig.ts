import mongoose from "mongoose";

export async function connect() { 
    try {
        await mongoose.connect(process.env.MONGODB_URL!);

        mongoose.connection.on('connected', () => {
            console.log("Connected to MongoDB");
        });

        mongoose.connection.on('error', (err) => {
            console.log("MongoDB connection error:", err);
        });
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
        process.exit(1);
    }
}
