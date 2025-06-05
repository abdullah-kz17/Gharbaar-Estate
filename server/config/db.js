const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    // Don't pass any options unless you're sure they are needed
    const conn = await mongoose.connect(process.env.MONGO_URI);
;

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports= connectDb;
