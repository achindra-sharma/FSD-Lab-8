import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDataFromDB } from './database/db.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';

const app = express();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
});

// GET /api - Welcome message
app.get('/api', async (req, res) => {
  res.status(200).json({ message: 'Welcome to the IntelliLearn API. Use /api/courses to get all courses.' });
});

// GET /api/courses with query parameters
app.get('/api/courses', async (req, res) => {
  const courses = await getDataFromDB();
  const filteredData = getDataByQueryParams(courses, req.query);
  res.status(200).json(filteredData);
});

// GET /api/courses/:id - Get specific course by ID
app.get('/api/courses/:id', async (req, res) => {
  const courses = await getDataFromDB();
  const course = getDataByPathParams(courses, req.params.id);
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).json({ message: `Course with id ${req.params.id} not found.` });
  }
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
