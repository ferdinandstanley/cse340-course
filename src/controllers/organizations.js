
import {
    getAllOrganizations,
    getOrganizationDetails,
    updateOrganization
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

// Display all organizations
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', {
        title,
        organizations
    });
};

// Display one organization's details and projects
const showOrganizationDetailsPage = async (req, res) => {
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
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};

export async function showEditOrganizationForm(req, res, next) {
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
}

export async function processEditOrganizationForm(req, res, next) {
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

        // Display success message
        req.flash('success', 'Organization updated successfully!');

        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
}