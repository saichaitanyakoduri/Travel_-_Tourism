// Email sending utility using EmailJS REST API
// See: https://www.emailjs.com/docs/rest-api/send/
// You must set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY in your .env

const axios = require('axios');
require('dotenv').config();

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_rclc1ya';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_xxxxxx'; // Set your template ID
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'; // Set your public key

// Usage: sendMail({ to, subject, message, ... })
async function sendMail({ to, subject, message, from_name = 'Travel App' }) {
  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      to_email: to,
      subject: subject,
      message: message,
      from_name: from_name,
    },
  };
  try {
    const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('EmailJS error:', error.response ? error.response.data : error);
    throw error;
  }
}

module.exports = { sendMail };
