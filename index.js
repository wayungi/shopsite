const express = require('express');
const app =  express();
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
// app.use(express.urlencoded())

app.use('/product', require('./routes/productRoutes'));


app.listen( PORT, console.log(`server is listening on port ${PORT}`))



