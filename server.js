require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    heading: 'Welcome to OrangeCap2',
    message: 'A static website built with Express and EJS',
    launchUrl: process.env.LAUNCH_URL
  });
});

app.get('/remote-offer-html', (req, res) => {
  const { height = '100px', width = '100px', color = 'red' } = req.query;

  const html = `
    <script>
      const div = document.createElement('div');
      div.style.cssText = 'width:${width};height:${height};background:${color}';
      document.getElementById('target-offer-container').appendChild(div);
    </script>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.get('/remote-offer-html-dynamic', (req, res) => {
   const color = req.query.color || 'red';
  
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': 'no-cache'
  });
  
  res.json({
    type: 'html',
    content: `<div style="width:100px;height:100px;background:${color}"></div>`
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found',
    launchUrl: process.env.LAUNCH_URL
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
