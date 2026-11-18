
import db from './db.js';

// Get all organizations
export const getAllOrganizations = async () => {
    const result = await db.query(`
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        ORDER BY organization_id ASC
    `);

    return result.rows;
};

// Get one organization by its ID
export const getOrganizationDetails = async (organizationId) => {
    const result = await db.query(`
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        WHERE organization_id = $1
    `, [organizationId]);

    return result.rows[0];
};
