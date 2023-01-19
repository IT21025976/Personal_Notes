require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 8070;
const URI = process.env.ATLAS_URI;

mongoose
  .connect(URI, {
  //  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
 //   useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Successfull");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

  app.listen(PORT,() => {
    console.log(`Server is up and running on port ${PORT}`)
  })

  const NotesRouter = require("./routes/notes");

 // http://localhost:8070/student
  app.use("/note",NotesRouter);