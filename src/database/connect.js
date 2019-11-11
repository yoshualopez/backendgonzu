const mongoose = require("mongoose");
// const app = "mongodb+srv://yoshualopez:yoshua15292915A@gonzudb-0iler.mongodb.net/test?retryWrites=true&w=majority"
var productiondatabase = "mongodb+srv://" + process.env.USERDATABASE + ":" + process.env.PASSWORDDATABASE + "@gonzudb-0iler.mongodb.net/test?retryWrites=true&w=majority";
var localdatabase = process.env.LOCALDATABASE;
mongoose
  .connect(localdatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => console.log("Database is connected", process.env.NODE_ENV))
  .catch(error => {
    console.log("error", error);
  });
