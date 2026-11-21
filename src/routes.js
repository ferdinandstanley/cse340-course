
import {
    organizationValidation,
    checkOrganizationData,
    projectValidation,
    checkProjectData
} from './middleware/validation.js';

import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showEditOrganizationForm,
    processEditOrganizationForm,
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations page
router.get('/organizations', showOrganizationsPage);

// Individual organization details
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/edit-organization/:id', showEditOrganizationForm);
router.post(
    '/new-project',
    projectValidation,
    checkProjectData,
    processNewProjectForm
);

// Assign categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Projects page
router.get('/projects', showProjectsPage);

// Edit an existing service project
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

// Create a new service project
router.get('/new-project', showNewProjectForm);
router.post('/new-project', processNewProjectForm);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Categories page
router.get('/categories', showCategoriesPage);

// Individual category details
router.get('/category/:id', showCategoryDetailsPage);

// Test route for server errors
router.get('/test-error', testErrorPage);

export default router;
