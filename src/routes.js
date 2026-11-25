
import {
    organizationValidation,
    checkOrganizationData,
    checkNewOrganizationData,
    projectValidation,
    checkProjectData,
    checkEditProjectData,
    categoryValidation,
    checkNewCategoryData,
    checkEditCategoryData
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
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
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

// Create organization
router.get('/new-organization', showNewOrganizationForm);
router.post(
    '/new-organization',
    organizationValidation,
    checkNewOrganizationData,
    processNewOrganizationForm
);

// Edit organization
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post(
    '/edit-organization/:id',
    organizationValidation,
    checkOrganizationData,
    processEditOrganizationForm
);

// Projects
router.get('/projects', showProjectsPage);

// Create project
router.get('/new-project', showNewProjectForm);
router.post(
    '/new-project',
    projectValidation,
    checkProjectData,
    processNewProjectForm
);

// Edit project
router.get('/edit-project/:id', showEditProjectForm);
router.post(
    '/edit-project/:id',
    projectValidation,
    checkEditProjectData,
    processEditProjectForm
);

// Individual project details
router.get('/project/:id', showProjectDetailsPage);

// Categories
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Create category
router.get('/new-category', showNewCategoryForm);
router.post(
    '/new-category',
    categoryValidation,
    checkNewCategoryData,
    processNewCategoryForm
);

// Edit category
router.get('/edit-category/:id', showEditCategoryForm);
router.post(
    '/edit-category/:id',
    categoryValidation,
    checkEditCategoryData,
    processEditCategoryForm
);

// Assign categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// Test route for server errors
router.get('/test-error', testErrorPage);

export default router;
