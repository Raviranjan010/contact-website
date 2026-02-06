require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Submission = require('./models/Submission');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your App Password
    },
});

// API Routes
app.get('/', (req, res) => {
    res.send('Contact Backend is Running!');
});

app.post('/api/submit', async (req, res) => {
    try {
        const { name, email, phone, message, relationshipStatus, extraAnswers } = req.body;

        // 1. Save to Database
        const newSubmission = new Submission({
            name,
            email,
            phone,
            message,
            relationshipStatus,
            extraAnswers,
        });
        await newSubmission.save();

        // 2. Format Email Content
        let emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #ff4d6d;">💌 New Message from Contact Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Status:</strong> ${relationshipStatus}</p>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ff4d6d; margin: 10px 0;">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
    `;

        if (relationshipStatus === 'Single' && extraAnswers) {
            emailHtml += `
        <h3 style="color: #ff4d6d;">💖 "Single" Questionnaire Answers:</h3>
        <ul>
          <li><strong>Looking For:</strong> ${extraAnswers.lookingFor || 'N/A'}</li>
          <li><strong>Ideal Date:</strong> ${extraAnswers.idealDate || 'N/A'}</li>
          <li><strong>Hobbies:</strong> ${extraAnswers.hobbies || 'N/A'}</li>
          <li><strong>Why Message:</strong> ${extraAnswers.whyMessage || 'N/A'}</li>
        </ul>
      `;
        }

        emailHtml += `</div>`;

        // 3. Send Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'raviranjankashyap7@gmail.com', // User's email
            subject: `New Contact: ${name} (${relationshipStatus})`,
            html: emailHtml,
        });

        res.status(201).json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
