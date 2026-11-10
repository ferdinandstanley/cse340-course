import 'dotenv/config';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organization.js';
import { getAllProjects } from './src/models/projects.js';

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

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

    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title,
            organizations
        });

    } catch (error) {
        console.error('Error loading organizations:', error);
        res.status(500).send('Unable to load organizations.');
    }
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';

    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title,
            projects
        });

    } catch (error) {
        console.error('Error loading service projects:', error);
        res.status(500).send('Unable to load service projects.');
    }
});

app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});

// Start server and test database connection
app.listen(PORT, async () => {
    try {
        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});