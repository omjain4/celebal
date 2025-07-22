import express from 'express';
import multer from 'multer';
import axios from 'axios';
import path from 'path';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('profile'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ filename: req.file.filename, path: req.file.path });
});


router.get('/github/:username', async (req, res, next) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${req.params.username}`);
    res.json(response.data);
  } catch (err) {
    next(err); 
  }
});
