const express=require("express");
const cors=require("cors")
const { connection } = require("./config/db");
const { ProdRooute } = require("./routes/product.route");
const app=express();
const port=9001;

app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/api",ProdRooute)

app.listen(port,async()=>{
    try{
        await connection;
        console.log('Data base connected')
    
    }catch(err){
        console.log('Database not connnected')
        console.log(err)
    }
    console.log(`Port is running on ${port}`)
})