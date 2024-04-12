const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;


//inisialisasi view engine ejs.
app.set('view engine', 'ejs');
app.set("views", [
    path.join(__dirname, "/views"),
]);



app.use(express.static(__dirname + "/public"));

//url path.

app.get('/', (req,res)=>{

    //buat variabel dengan nilai untuk title halaman.

    const title = "To-Do List Page";

    res.render('index',{
        title
    });
})



app.listen(PORT,()=>{
    console.log('server berjalan pada port ' + PORT);
})