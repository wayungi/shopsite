const express = require('express');
const app =  express();
const PORT = process.env.PORT || 3000
const cookieParser =  require('cookie-parser');
const mongoose =  require('mongoose');

//middleware
app.use(express.json())
// app.use(express.urlencoded())
app.use(cookieParser())

app.use('/product', require('./routes/productRoutes'));
app.use('/users', require('./routes/usersRoutes'));

app.listen( PORT, console.log(`server is listening on port ${PORT}`))



