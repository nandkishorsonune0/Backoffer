const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://nandkishorsonune0:nandkishor@cluster0.mwba9yx.mongodb.net/database_backoffer';

// Fix DeprecationWarning
mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());

// Data Schema
const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: String,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

// Data Model
const DataModel = mongoose.model('Data', dataSchema);

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Connect to MongoDB and Start the Server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Read data.json file and insert data into MongoDB
    try {
      const jsonData = await fs.promises.readFile('./data.json', 'utf8');
      const parsedData = JSON.parse(jsonData);
      await DataModel.insertMany(parsedData);
      console.log('JSON data inserted into MongoDB');
    } catch (error) {
      console.error('Error reading or inserting JSON data:', error);
    }

    // Start the server after seeding the data
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
