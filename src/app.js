const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./routes/user.route");
const uploadRoutes = require("./routes/upload.route");
app.use(express.json());

app.get("/api/v1",(req,res)=>{
    res.send("API is running.");
});

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/upload",uploadRoutes);

app.use(errorMiddleware);

module.exports = app;