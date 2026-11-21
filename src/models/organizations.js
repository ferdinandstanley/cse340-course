
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

export async function updateOrganization(
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
) {
    const sql = `
        UPDATE organization
        SET name = $1,
            description = $2,
            contact_email = $3,
            logo_filename = $4
        WHERE organization_id = $5
        RETURNING organization_id;
    `;

    const values = [
        name,
        description,
        contactEmail,
        logoFilename,
        organizationId
    ];

    const result = await pool.query(sql, values);

    if (result.rowCount === 0) {
        throw new Error('Organization not found');
    }

    return result.rows[0];
}