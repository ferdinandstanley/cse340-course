
import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

// Display all organizations
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', {
            title,
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Display one organization's details and projects
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const organizationDetails = await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            const err = new Error('Organization Not Found');
            err.status = 404;
            throw err;
        }

        const projects = await getProjectsByOrganizationId(organizationId);

        const title = organizationDetails.name;

        res.render('organization', {
            title,
            organizationDetails,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Display the new organization form
const showNewOrganizationForm = (req, res) => {
    res.render('new-organization', {
        title: 'Create New Organization',
        organization: {}
    });
};

// Process the new organization form
const processNewOrganizationForm = async (req, res, next) => {
    try {
        const {
            name,
            description,
            contactEmail,
            logoFilename
        } = req.body;

        const newOrganization = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        req.flash('success', 'Organization created successfully!');

        res.redirect(`/organization/${newOrganization.organization_id}`);
    } catch (error) {
        next(error);
    }
};

// Display the edit organization form
const showEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const organizationDetails = await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            const error = new Error('Organization not found');
            error.status = 404;
            throw error;
        }

        res.render('edit-organization', {
            title: 'Edit Organization',
            organizationDetails
        });
    } catch (error) {
        next(error);
    }
};

// Process the edit organization form
const processEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        const {
            name,
            description,
            contactEmail,
            logoFilename
        } = req.body;

        await updateOrganization(
            organizationId,
            name,
            description,
            contactEmail,
            logoFilename
        );

        req.flash('success', 'Organization updated successfully!');

        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
};
