const express = require('express');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');


const app = express();
const PORT = process.env.PORT;


//inisialisasi view engine ejs.
app.set('view engine', 'ejs');
app.set("views", [
    path.join(__dirname, "/views"),
]);



app.use(express.static(__dirname + "/public"));


//inisialisasi routes.

app.use('/', userRoutes, loginRoutes);


app.listen(PORT,()=>{
    console.log('server berjalan pada port ' + PORT);
})