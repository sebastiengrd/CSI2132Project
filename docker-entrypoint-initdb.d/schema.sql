CREATE TABLE Users (
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    PRIMARY KEY (username),
    CONSTRAINT Age_Chk CHECK (EXTRACT(YEAR FROM age(DateOfBirth)) >= 18)
);
    
CREATE TABLE Persons (
    SSN INTEGER NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    MiddleName VARCHAR(255),
    LastName VARCHAR(255) NOT NULL,
    Gender VARCHAR(255),
    DateOfBirth DATE NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(255) NOT NULL,
    PRIMARY KEY (SSN),
    CONSTRAINT fk_username
        FOREIGN KEY (username) 
            REFERENCES Users(username) 
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Patients (
    patient_id INTEGER UNIQUE NOT NULL,
    SSN INTEGER UNIQUE NOT NULL,
    balance NUMERIC(8,2) NOT NULL,
    PRIMARY KEY (patient_id),
    CONSTRAINT fk_ssn
        FOREIGN KEY (SSN) 
            REFERENCES Persons(SSN)
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Branches (
    branch_id INTEGER UNIQUE NOT NULL,
    city VARCHAR(20) NOT NULL,
    manager_id INTEGER UNIQUE NOT NULL,
    PRIMARY KEY (branch_id)
);

CREATE TYPE employee_role as ENUM('Dentist', 'Hygienist', 'Receptionist');
CREATE TYPE employee_type as ENUM('Part-time', 'Full-time');

CREATE TABLE Employees (
    employee_id INTEGER UNIQUE NOT NULL,
    SSN INTEGER UNIQUE NOT NULL,
    salary NUMERIC(8,2) NOT NULL,
    emp_role employee_role,
    emp_type employee_type,
    branch_id INTEGER NOT NULL,
    PRIMARY KEY (employee_id),
    CONSTRAINT fk_branch
        FOREIGN KEY (branch_id) 
            REFERENCES Branches(branch_id)
                ON UPDATE CASCADE ON DELETE NO ACTION
);

ALTER TABLE Branches ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Employees(employee_id);

CREATE TABLE Invoices (
    invoice_id INTEGER UNIQUE NOT NULL,
    issueDate TIMESTAMP NOT NULL,
    patient_charge NUMERIC(8,2) NOT NULL,
    insur_charge NUMERIC(8,2),
    total_fee NUMERIC(8,2),
    discount NUMERIC(8,2),
    penalty NUMERIC(8,2),
    PRIMARY KEY (invoice_id)
);

CREATE TYPE appoint_status as ENUM('Confirmed', 'Cancelled', 'Completed');
CREATE TABLE Appointments (
    appoint_id INTEGER UNIQUE NOT NULL,
    patient_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    appoint_type VARCHAR(255),
    status appoint_status,
    room INTEGER NOT NULL,
    invoice_id INTEGER NOT NULL,
    PRIMARY KEY (appoint_id),
    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
            REFERENCES Patients(patient_id)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fk_employee
        FOREIGN KEY(employee_id)
            REFERENCES Employees(employee_id)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fk_invoice
        FOREIGN KEY(invoice_id)
            REFERENCES Invoices(invoice_id)
                ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE Procedures (
    procedure_id INTEGER UNIQUE NOT NULL,
    appoint_id INTEGER NOT NULL,
    procedure_code INTEGER NOT NULL,
    fee_code INTEGER NOT NULL,
    proc_type VARCHAR(255),
    proc_description VARCHAR(255),
    toothInvolved VARCHAR(255) NOT NULL,
    amountOfProcedure INTEGER,
    fee_charge NUMERIC(8,2) NOT NULL,
    PRIMARY KEY (procedure_id),
    CONSTRAINT fk_appointment
        FOREIGN KEY(appoint_id)
            REFERENCES Appointments(appoint_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Treatments (
    treatment_id INTEGER UNIQUE NOT NULL,
    appoint_id INTEGER NOT NULL,
    treat_type VARCHAR(255),
    medication VARCHAR(255) NOT NULL,
    symptoms VARCHAR(255),
    tooth VARCHAR(255) NOT NULL,
    comments VARCHAR(255),
    cost NUMERIC(8,2) NOT NULL,
    note VARCHAR(255),
    PRIMARY KEY (treatment_id),
    CONSTRAINT fk_appointment
        FOREIGN KEY(appoint_id)
            REFERENCES Appointments(appoint_id)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Payments (
    payment_id INTEGER UNIQUE NOT NULL,
    patient_charge NUMERIC(8,2) NOT NULL,
    insur_charge NUMERIC(8,2) NOT NULL,
    total_amount NUMERIC(8,2) NOT NULL,
    paymentType VARCHAR(255) NOT NULL,
    invoice_id INTEGER NOT NULL,
    PRIMARY KEY (payment_id),
    CONSTRAINT fk_invoice
        FOREIGN KEY(invoice_id)
            REFERENCES Invoices(invoice_id)
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Reviews (
    review_id INTEGER UNIQUE NOT NULL,
    branch_id INTEGER NOT NULL,
    professionalism INTEGER NOT NULL,
    communication INTEGER NOT NULL,
    cleanliness INTEGER NOT NULL,
    serviceValue INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    PRIMARY KEY (review_id),
    CHECK (professionalism <= 5 AND professionalism >= 0),
    CHECK (communication <= 5 AND communication >= 0),
    CHECK (cleanliness <= 5 AND cleanliness >= 0),
    CHECK (serviceValue <= 5 AND serviceValue >= 0),
    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
            REFERENCES Patients(patient_id)
                ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE InsuranceClaims(
    claim_id INTEGER UNIQUE NOT NULL,
    payment_id INTEGER NOT NULL,
    PRIMARY KEY (claim_id),
    CONSTRAINT fk_payment
        FOREIGN KEY(payment_id)
            REFERENCES Payments(payment_id)
                ON UPDATE CASCADE ON DELETE NO ACTION
);