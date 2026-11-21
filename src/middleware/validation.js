import { body, validationResult } from 'express-validator';

// Organization validation rules
export const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.')
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters.'),

    body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .normalizeEmail()
];

// Check organization validation results
export const checkOrganizationData = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-organization', {
            title: 'Edit Organization',
            organizationDetails: {
                ...req.body,
                organization_id: req.params.id,
                contact_email: req.body.contactEmail,
                logo_filename: req.body.logoFilename
            },
            errors: errors.array()
        });
    }

    next();
};

// Project validation rules
export const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ max: 200 })
        .withMessage('Location cannot exceed 200 characters.'),

    body('date')
        .notEmpty()
        .withMessage('Project date is required.')
        .isISO8601()
        .withMessage('Please provide a valid project date.'),

    body('organizationId')
        .notEmpty()
        .withMessage('Please select an organization.')
        .isInt()
        .withMessage('Please select a valid organization.')
];

// Check project validation results
export const checkProjectData = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        try {
            const { getAllOrganizations } =
                await import('../models/organizations.js');

            const organizations = await getAllOrganizations();

            return res.status(400).render('new-project', {
                title: 'Create New Service Project',
                organizations,
                errors: errors.array(),
                project: req.body
            });
        } catch (error) {
            return next(error);
        }
    }

    next();
};