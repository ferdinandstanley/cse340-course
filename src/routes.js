
import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations page
router.get('/organizations', showOrganizationsPage);

// Individual organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects page
router.get('/projects', showProjectsPage);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Categories page
router.get('/categories', showCategoriesPage);

// Individual category details
router.get('/category/:id', showCategoryDetailsPage);

// Test route for server errors
router.get('/test-error', testErrorPage);

export default router;
