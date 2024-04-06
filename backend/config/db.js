require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.REACT_APP_MONGO_URI);
       console.log('MongoDB Connection Successful!');
    } catch (error) {
        console.error('MongoDB Connection Failed!')
        console.log(process.env.REACT_APP_MONGO_URI)
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;
