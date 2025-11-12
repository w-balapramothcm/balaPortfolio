// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config({ path: "./credentails.env" }); // Load credentials.env

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins for local testing

// POST endpoint to send email
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message || !subject) {
    return res.status(400).send("❌ Missing required fields");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name || "Website Visitor"}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email, // Replies go to the visitor
      subject: subject,
      text:
        `You received a new message from your website contact form:\n\n` +
        `Name: ${name || "N/A"}\n` +
        `Email: ${email}\n` +
        `Message:\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.status(200).send("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("❌ Error sending email");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
