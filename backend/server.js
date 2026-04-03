/**
 * ========================================
 *  AADESH PANDEY PORTFOLIO — BACKEND
 *  Express API Server
 * ========================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '10kb' }));

// Serve frontend static files (for production)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// --- RATE LIMITING ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many requests. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- EMAIL TRANSPORTER ---
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use Gmail App Password
    },
  });
};

// --- ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, email, message).',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (name.length > 100 || email.length > 100 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Input exceeds maximum allowed length.',
      });
    }

    // Send email
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || '2002.aman.p@gmail.com',
      replyTo: email,
      subject: `Portfolio: New message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #12121a; color: #e8e6f0; border-radius: 16px;">
          <h2 style="color: #a29bfe; margin-bottom: 24px; font-size: 24px;">New Contact Form Submission</h2>
          <div style="background: #1e1e2a; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px; color: #9896a8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
            <p style="margin: 0; font-size: 16px;">${name}</p>
          </div>
          <div style="background: #1e1e2a; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px; color: #9896a8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
            <p style="margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #6c5ce7;">${email}</a></p>
          </div>
          <div style="background: #1e1e2a; padding: 20px; border-radius: 12px;">
            <p style="margin: 0 0 8px; color: #9896a8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,.06); margin: 24px 0;" />
          <p style="color: #6b6980; font-size: 12px; text-align: center;">Sent from your portfolio website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Auto-reply to sender
    const autoReplyOptions = {
      from: `"Aadesh Pandey" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #12121a; color: #e8e6f0; border-radius: 16px;">
          <h2 style="color: #a29bfe; margin-bottom: 16px;">Hi ${name}!</h2>
          <p style="line-height: 1.8; color: #9896a8;">Thanks for reaching out through my portfolio. I've received your message and will get back to you within 24-48 hours.</p>
          <p style="line-height: 1.8; color: #9896a8;">In the meantime, feel free to connect with me on <a href="https://linkedin.com/in/aadesh-pandey-b873a325b" style="color: #6c5ce7;">LinkedIn</a>.</p>
          <p style="margin-top: 24px; color: #e8e6f0;">Best regards,<br/><strong>Aadesh Pandey</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    });
  }
});

// Catch-all: serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// --- START ---
app.listen(PORT, () => {
  console.log(`\n  🚀 Portfolio server running on http://localhost:${PORT}\n`);
});
