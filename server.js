const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './src/views');

// Serve static files
app.use(express.static('public'));

/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});