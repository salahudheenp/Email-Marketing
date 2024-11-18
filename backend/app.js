const express = require('express');
const mongoose = require('mongoose');
const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html: body,
  });
});

app.post('/api/save-flowchart', async (req, res) => {
  const { nodes, edges } = req.body;

  // Save flowchart data to MongoDB
  // Schedule emails based on the flowchart structure

  res.json({ message: 'Flowchart saved and emails scheduled' });
});

app.post('/api/schedule-email', async (req, res) => {
  const { to, subject, body, delay } = req.body;

  await agenda.schedule(`in ${delay} hours`, 'send email', { to, subject, body });

  res.json({ message: 'Email scheduled successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  await agenda.start();
})();