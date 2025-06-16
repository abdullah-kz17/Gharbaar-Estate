// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();
const multer = require('multer');


const cors = require("cors")
const sendEmail = require("./config/sendEmail")

// Then import other modules
const express = require("express");
const connectDb = require("./config/db.js");

const authRoute = require("./router/authRoutes.js")
const propertyRoute = require("./router/propertyRoutes.js")
const favouriteRoute = require("./router/favouriteRoutes.js")
const serviceRoute = require("./router/serviceProviderRoutes.js")
const favoriteServiceRoute = require("./router/favouriteServiceRoute.js")
const userRoutes = require("./router/userRoutes.js")
const requestRoutes = require("./router/serviceRequestRoutes.js")
const aiRoutes = require("./router/aiRoutes.js")

const Property = require('./models/propertyModel');


const app = express();

app.use(cors())
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use("/api/auth", authRoute)
app.use("/api/property", propertyRoute)
app.use("/api/favourite", favouriteRoute)
app.use("/api/serviceProvider", serviceRoute)
app.use("/api/favoriteService", favoriteServiceRoute)
app.use("/api/admin/user", userRoutes)
app.use("/api/request", requestRoutes)
app.use("/api/ai", aiRoutes);


// catch multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err.message === 'Invalid file type. Only JPG, JPEG, and PNG are allowed.') {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error("🌋 Uncaught error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});


app.post("/api/contact", async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `;

    await sendEmail(
      process.env.RECEIVER_EMAIL,
      `Contact Form: ${subject}`,
      html
    );

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email." });
  }
});


const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    await Property.syncIndexes();

    console.log('Indexes synced for Property model');
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();
