const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Oleksiy:xJlEFnozwEMqddHS@cluster0.0ruedsq.mongodb.net/contacts_database?retryWrites=true&w=majority";

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
    .then(() => console.log("Database conect success"))
    .catch(error => console.log(error.mesage))
