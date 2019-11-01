const mongoose = require('mongoose');
var productiondatabase = "mongodb+srv://"+process.env.USERDATABASE+":"+process.env.PASSWORDDATABASE+"@gonzudb-0iler.mongodb.net/test?retryWrites=true&w=majority";
var localdatabase = process.env.LOCALDATABASE;
mongoose.connect(localdatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database is connected')).catch((error) =>{
	console.log("error",error);
});