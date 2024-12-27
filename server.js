const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Gmail account credentials
const gmailUser = 'your-email@gmail.com';
const gmailPassword = 'your-password';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: '(link unavailable)',
    port: 587,
    secure: false,
    auth: {
        user: gmailUser,
        pass: gmailPassword
    }
});

// Route to send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: gmailUser,
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent successfully');
            res.json({ message: 'Email sent successfully' });
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});