const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route for handling contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Here, you can handle saving this data to a database
  // For demonstration, we're just sending a success response
  res.json({ success: true, message: 'Message received' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
