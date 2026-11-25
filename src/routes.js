
import {
    organizationValidation,
    checkOrganizationData,
    checkNewOrganizationData,
    projectValidation,
    checkProjectData,
    checkEditProjectData
} from './middleware/validation.js';

import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
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

// Organizations
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Create a new organization
router.get('/new-organization', showNewOrganizationForm);

router.post(
    '/new-organization',
    organizationValidation,
    checkNewOrganizationData,
    processNewOrganizationForm
);

// Edit an existing organization
router.get('/edit-organization/:id', showEditOrganizationForm);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    checkOrganizationData,
    processEditOrganizationForm
);

// Projects
router.get('/projects', showProjectsPage);

// Create a new service project
router.get('/new-project', showNewProjectForm);

router.post(
    '/new-project',
    projectValidation,
    checkProjectData,
    processNewProjectForm
);

// Edit an existing service project
router.get('/edit-project/:id', showEditProjectForm);

router.post(
    '/edit-project/:id',
    projectValidation,
    checkEditProjectData,
    processEditProjectForm
);

// Individual service project details
router.get('/project/:id', showProjectDetailsPage);

// Assign categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Test route for server errors
router.get('/test-error', testErrorPage);

export default router;
