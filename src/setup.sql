
-- ========================================
-- Create Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- Create Service Project Table

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);


-- ==========================================
-- INSERT SERVICE PROJECTS
-- ==========================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- BrightFuture Builders (ID: 1)

(1, 'Community School Renovation',
 'Renovating classrooms and improving learning facilities for children.',
 'Lagos, Nigeria', '2026-12-05'),

(1, 'Rural Road Improvement',
 'Improving rural roads to provide safer access to local communities.',
 'Ogun State, Nigeria', '2026-12-12'),

(1, 'Safe Drinking Water Initiative',
 'Providing clean and safe drinking water to underserved communities.',
 'Oyo State, Nigeria', '2026-12-19'),

(1, 'Community Health Center Construction',
 'Building a health center to improve access to basic healthcare.',
 'Abuja, Nigeria', '2027-01-10'),

(1, 'Affordable Housing Project',
 'Supporting the construction of affordable homes for low-income families.',
 'Port Harcourt, Nigeria', '2027-01-17'),


-- GreenHarvest Growers (ID: 2)

(2, 'Urban Community Garden',
 'Creating community gardens to promote local food production.',
 'Lagos, Nigeria', '2026-12-06'),

(2, 'School Vegetable Garden Program',
 'Teaching students how to grow vegetables and practice sustainable farming.',
 'Ibadan, Nigeria', '2026-12-13'),

(2, 'Sustainable Farming Workshop',
 'Training farmers on sustainable agricultural practices.',
 'Abeokuta, Nigeria', '2026-12-20'),

(2, 'Tree Planting Initiative',
 'Planting trees to improve the environment and promote greener communities.',
 'Lagos, Nigeria', '2027-01-11'),

(2, 'Community Composting Project',
 'Teaching residents how to convert organic waste into useful compost.',
 'Enugu, Nigeria', '2027-01-18'),


-- UnityServe Volunteers (ID: 3)

(3, 'Neighborhood Cleanup',
 'Organizing volunteers to clean streets and public spaces.',
 'Lagos, Nigeria', '2026-12-07'),

(3, 'Food Donation Drive',
 'Collecting and distributing food to families in need.',
 'Abuja, Nigeria', '2026-12-14'),

(3, 'Elderly Care Outreach',
 'Supporting elderly residents through visits and community assistance.',
 'Port Harcourt, Nigeria', '2026-12-21'),

(3, 'Community Tutoring Program',
 'Providing free tutoring and educational support to young students.',
 'Ibadan, Nigeria', '2027-01-12'),

(3, 'Homeless Support Initiative',
 'Providing essential supplies and support to people experiencing homelessness.',
 'Lagos, Nigeria', '2027-01-19');

-- ==========================================
-- VERIFY ORGANIZATION RECORDS
-- ==========================================

SELECT * FROM organization;

-- ==========================================
-- VERIFY SERVICE PROJECT RECORDS
-- ==========================================

SELECT * FROM service_project;