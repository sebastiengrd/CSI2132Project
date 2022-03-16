CREATE TABLE IUser (
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    PRIMARY KEY (username),
    CONSTRAINT AgeChk CHECK (EXTRACT(YEAR FROM age(DateOfBirth)) >= 18)
);
    
CREATE TABLE Person (
    ssn INTEGER NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    middleName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    dateOfBirth DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    PRIMARY KEY (ssn),
    CONSTRAINT fkUsername
        FOREIGN KEY (username) 
            REFERENCES IUser(username) 
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Patient (
    patientId INTEGER UNIQUE NOT NULL,
    ssn INTEGER UNIQUE NOT NULL,
    balance NUMERIC(8,2) NOT NULL,
    PRIMARY KEY (patientId),
    CONSTRAINT fkSsn
        FOREIGN KEY (ssn) 
            REFERENCES Person(ssn)
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Branch (
    branchId INTEGER UNIQUE NOT NULL,
    city VARCHAR(20) NOT NULL,
    managerId INTEGER UNIQUE NOT NULL,
    PRIMARY KEY (branchId)
);

CREATE TYPE employeeRole as ENUM('Dentist', 'Hygienist', 'Receptionist');
CREATE TYPE employeeType as ENUM('Part-time', 'Full-time');

CREATE TABLE Employee (
    employeeId INTEGER UNIQUE NOT NULL,
    ssn INTEGER UNIQUE NOT NULL,
    salary NUMERIC(8,2) NOT NULL,
    empRole employeeRole,
    empType employeeType,
    branchId INTEGER NOT NULL,
    PRIMARY KEY (employeeId),
    CONSTRAINT fkBranch
        FOREIGN KEY (branchId) 
            REFERENCES Branch(branchId)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fkSsn
        FOREIGN KEY (ssn) 
            REFERENCES Person(ssn)
                ON UPDATE CASCADE ON DELETE NO ACTION
);

ALTER TABLE Branch ADD CONSTRAINT fkManager FOREIGN KEY (managerId) REFERENCES Employee(employeeId);

CREATE TABLE Invoice (
    invoiceId INTEGER UNIQUE NOT NULL,
    issueDate TIMESTAMP NOT NULL,
    patientCharge NUMERIC(8,2) NOT NULL,
    insurCharge NUMERIC(8,2),
    totalFee NUMERIC(8,2), -- TODO: Check back later
    discount NUMERIC(8,2),
    penalty NUMERIC(8,2),
    PRIMARY KEY (invoiceId)
);

CREATE TYPE appointStatus as ENUM('Confirmed', 'Cancelled', 'Completed');
CREATE TABLE Appointment (
    appointId INTEGER UNIQUE NOT NULL,
    patientId INTEGER NOT NULL,
    employeeId INTEGER NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    appointType VARCHAR(255),
    status appointStatus,
    room INTEGER NOT NULL,
    invoiceId INTEGER NOT NULL,
    PRIMARY KEY (appointId),
    CONSTRAINT fkPatient
        FOREIGN KEY(patientId)
            REFERENCES Patient(patientId)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fkEmployee
        FOREIGN KEY(employeeId)
            REFERENCES Employee(employeeId)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fkInvoice
        FOREIGN KEY(invoiceId)
            REFERENCES Invoice(invoiceId)
                ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE AppointmentProcedure (
    procedureId INTEGER UNIQUE NOT NULL,
    appointId INTEGER NOT NULL,
    procedureCode INTEGER NOT NULL,
    feeCode INTEGER NOT NULL,
    procType VARCHAR(255),
    procDescription VARCHAR(255),
    toothInvolved VARCHAR(255) NOT NULL,
    amountOfProcedure INTEGER,
    feeCharge NUMERIC(8,2) NOT NULL,
    PRIMARY KEY (procedureId),
    CONSTRAINT fkAppointment
        FOREIGN KEY(appointId)
            REFERENCES Appointment(appointId)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Treatment (
    treatmentId INTEGER UNIQUE NOT NULL,
    appointId INTEGER NOT NULL,
    treatType VARCHAR(255),
    medication VARCHAR(255) NOT NULL,
    symptoms VARCHAR(255),
    tooth VARCHAR(255) NOT NULL,
    comments VARCHAR(255),
    cost NUMERIC(8,2) NOT NULL,
    note VARCHAR(255),
    PRIMARY KEY (treatmentId),
    CONSTRAINT fkAppointment
        FOREIGN KEY(appointId)
            REFERENCES Appointment(appointId)
            ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Payment (
    paymentId INTEGER UNIQUE NOT NULL,
    patientCharge NUMERIC(8,2) NOT NULL,
    insurCharge NUMERIC(8,2) NOT NULL,
    totalAmount NUMERIC(8,2) NOT NULL, -- TODO: CHECK back later
    paymentType VARCHAR(255) NOT NULL,
    invoiceId INTEGER NOT NULL,
    PRIMARY KEY (paymentId),
    CONSTRAINT fkInvoice
        FOREIGN KEY(invoiceId)
            REFERENCES Invoice(invoiceId)
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Review (
    reviewId INTEGER UNIQUE NOT NULL,
    branchId INTEGER NOT NULL,
    professionalism INTEGER NOT NULL,
    communication INTEGER NOT NULL,
    cleanliness INTEGER NOT NULL,
    serviceValue INTEGER NOT NULL,
    patientId INTEGER NOT NULL,
    PRIMARY KEY (reviewId),
    CHECK (professionalism <= 5 AND professionalism >= 0),
    CHECK (communication <= 5 AND communication >= 0),
    CHECK (cleanliness <= 5 AND cleanliness >= 0),
    CHECK (serviceValue <= 5 AND serviceValue >= 0),
    CONSTRAINT fkPatient
        FOREIGN KEY(patientId)
            REFERENCES Patient(patientId)
                ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT fkBranch
        FOREIGN KEY(branchId)
            REFERENCES Branch(branchId)
                ON UPDATE CASCADE ON DELETE NO ACTION                
);

CREATE TABLE InsuranceClaim(
    claimId INTEGER UNIQUE NOT NULL,
    paymentId INTEGER NOT NULL,
    PRIMARY KEY (claimId),
    CONSTRAINT fkPayment
        FOREIGN KEY(paymentId)
            REFERENCES Payment(paymentId)
                ON UPDATE CASCADE ON DELETE NO ACTION
);