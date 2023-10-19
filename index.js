//require dotenv here and delte it from all other files
require('dotenv').config();

const express = require('express');
const app =  express();
const PORT = process.env.PORT || 3000
const cookieParser =  require('cookie-parser');
const mongoose =  require('mongoose');
const connectDB =  require('./config/dbCon');

const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {};
const logEvents =  require('./LogEvents');


//initialize object
const myEmitter = new MyEmitter();
myEmitter.on('log', (msg) => logEvents(msg)); // myEmmitter is now listening to the log event but the event is not emiited yet.

// set the test emitter here
setTimeout(() => {
    myEmitter.emit('log', 'Log event emiited')
}, 2000);

//connect to mongodb first before anything else & if connection fails, dont let the app start
connectDB();

//middleware
app.use(express.json())
// app.use(express.urlencoded())
app.use(cookieParser())

app.use('/product', require('./routes/productRoutes'));
app.use('/users', require('./routes/usersRoutes'));

//Make sure app  does not start when connection to db fails
mongoose.connection.once('open', () => { // listen fot the connection event only once, disregard reconnections if any
    console.log('Connected to mongodb');
    app.listen( PORT, console.log(`server is listening on port ${PORT}`));
})



