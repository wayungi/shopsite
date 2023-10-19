const mongoose =  require('mongoose');

//***************deployment on cloud
// const connectDB =  async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI);// {useUnifiedTopology: true, useNewUrlParser: true}
//     }catch (err) {
//         console.log(err)
//     }
// };


// ******************developoment on localhost
const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.DB_URI);// {useUnifiedTopology: true, useNewUrlParser: true}
    }catch (err) {
        console.log(err)
    }
};

module.exports = connectDB;
