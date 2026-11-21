
import 'dotenv/config';
import express from 'express';

import { testConnection } from './src/models/db.js';
import router from './src/routes.js';

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Set the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './src/views');

// Make NODE_ENV available in EJS templates
app.locals.NODE_ENV = NODE_ENV;

// Middleware to process form submissions
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Use application routes
app.use(router);

/**
 * Handle requests for pages that do not exist (404)
 */
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

/**
 * Global error handler (404 and 500)
 */
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    res.status(status).render(`errors/${template}`, context);
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
