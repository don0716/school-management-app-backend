const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to Database.");
    })
    .catch((error) => console.log("Error connecting to Database", error));
};

module.exports = { initializeDatabase };

// const initializeDatabase = async () => {
//   try {
//     const connection = await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     if (connection) {
//       console.log("Connected Successfully");
//     }
//   } catch (error) {
//     console.log("Connection Failed", error);
//   }
// };

// module.exports = { initializeDatabase };
