import mongoose from "mongoose"; // ✅ Correct spelling is "mongoose"

export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "campus",
        })
        .then(() => {
            console.log("✅ Connected to the database successfully");
        })
        .catch((err) => {
            console.error("❌ Error while connecting to the database:", err);
        });
};
