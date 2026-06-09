const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Minimal mock server endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running minimally!' });
});

app.listen(PORT, () => {
  // Console log allowed here as it's backend startup, not main app flow
  console.log(`Minimal backend running on port ${PORT}`);
});
