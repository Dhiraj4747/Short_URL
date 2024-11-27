const express = require("express")
const {connectToMongoDB}= require("./connection")
const urlRoute = require("./routes/url.routes")
const URL = require("./models/url")
const staticRouter = require("./routes/Static.router");
const userRouter = require("./routes/user.router");//for userRouter
const path = require("path")

const app = express();
const port = 8001

app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

connectToMongoDB("mongodb://localhost:27017/urlDatabase")
.then(()=>{
   console.log("mongodb connect succesfully ")
})
.catch((err)=>{
   console.log("mongodb is connected ",err)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/url",urlRoute);

app.use("/",staticRouter);

app.use("/user",userRouter)

app.get("/url/:shortId", async (req, res) => {
   console.log("request is received in this port");
   const shortId = req.params.shortId;

   try {
      const entry = await URL.findOneAndUpdate(
         { shortId },
         {
            $push: {
               visitHistory: {
                  timestamp: Date.now(),
               },
            },
         },
         { new: true } // Optional: returns the updated document
      );

      if (!entry) {
         return res.status(404).json({ message: "URL not found" });
      }

      return res.redirect(entry.redirectURL);
   } catch (error) {
      console.error("Error fetching URL:", error);
      return res.status(500).json({ message: "Internal server error" });
   }
});






app.listen(port,()=>{
   console.log(`Server is running on the port ${port}`)
})