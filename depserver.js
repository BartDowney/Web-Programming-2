import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/notes-frontend')));

// Proxy API requests to the backend server
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:3000', // Replace with your backend server URL
    changeOrigin: true,
  })
);

// Serve the Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/notes-frontend/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

