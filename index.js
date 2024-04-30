const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();
const database = require('./utils/database');
const redis = require('redis');
const RedisStore = require("connect-redis").default;

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');


const server = async()=> {

const app = express();
const PORT = process.env.PORT;

const db = await database()
await db.connect()

const client = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: { 
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }
  });
(async () => { await client.connect(); })()

app.use(session({
    proxy: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ 
        client: client,
        // ttl: 3600, // waktu kadaluwarsa dalam detik (misalnya 1 jam)
      
      
    }),
}));

//inisialisasi view engine ejs.
app.set('view engine', 'ejs');
app.set("views", [
    path.join(__dirname, "/views"),
]);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));
// Menambahkan middleware body-parser pada aplikasi
// app.use(bodyParser.json());
// // parse request to body-parser
// app.use(bodyParser.urlencoded({ extended : true}))

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


//inisialisasi routes.

app.use('/', loginRoutes);
app.use('/user',userRoutes)

app.listen(PORT,()=>{
    console.log('server berjalan pada port ' + PORT);
})
}

server()
