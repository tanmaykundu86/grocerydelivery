import mongoose from "mongoose";

export const mongoDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "freshcartDB",
    }).then(() => console.log("Database is connected."))
    .catch((e) => console.log(e))
}