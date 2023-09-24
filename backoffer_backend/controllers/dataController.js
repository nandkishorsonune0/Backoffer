const Data = require('../models/dataModel');

// Controller to get all data
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to get filtered data
exports.getFilteredData = async (req, res) => {
  try {
    // Implement the logic to filter data based on query parameters (e.g., req.query).
    // You can use MongoDB's $match and $filter operators for this purpose.
    // For example, to filter by Country:
    // const data = await Data.find({ Country: req.query.country });

    // Return the filtered data as a JSON response
    // res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
