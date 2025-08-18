import app from "./app.js";

app.listen(process.env.PORT,()=>{
    console.log(`Server Runing on port ${process.env.PORT}`);
})