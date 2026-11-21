const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin with your configuration or default
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

app.post('/send-notification', async (req, res) => {
  try {
    const { token, title, body, imageUrl } = req.body;
    
    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
        imageUrl: imageUrl
      }
    };

    const response = await admin.messaging().send(message);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
