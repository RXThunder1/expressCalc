const express = require('express');
const app = express();
const port = 3000;

// Helper function to parse and validate numbers
function parseNumbers(nums) {
  if (!nums) {
    throw new Error('nums are required');
  }
  const numArray = nums.split(',').map(num => {
    const parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) {
      throw new Error(`${num} is not a number.`);
    }
    return parsedNum;
  });
  return numArray;
}

// Mean Route
app.get('/mean', (req, res) => {
  try {
    const nums = req.query.nums;
    const numArray = parseNumbers(nums);
    const mean = numArray.reduce((acc, val) => acc + val, 0) / numArray.length;
    res.json({ operation: 'mean', value: mean });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Median Route
app.get('/median', (req, res) => {
  try {
    const nums = req.query.nums;
    const numArray = parseNumbers(nums).sort((a, b) => a - b);
    const length = numArray.length;
    const median = length % 2 === 0 
      ? (numArray[length / 2 - 1] + numArray[length / 2]) / 2 
      : numArray[Math.floor(length / 2)];
    res.json({ operation: 'median', value: median });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mode Route
app.get('/mode', (req, res) => {
  try {
    const nums = req.query.nums;
    const numArray = parseNumbers(nums);
    const frequency = {};
    numArray.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFrequency = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(num => frequency[num] === maxFrequency);
    res.json({ operation: 'mode', value: modes.length === numArray.length ? 'No mode' : modes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});