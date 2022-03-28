-- username, email, DateOfBirth
INSERT INTO IUser 
VALUES
    ('admin', 'admin@dbms.com', '1990-07-20'),
    ('patient101', 'john@dbms.com', '1999-06-18'),
    ('patient102', 'adams@dbms.com', '2000-06-18'),
    ('patient103', 'amy@dbms.com', '1650-06-18'),
    ('patient104', 'hened@dbms.com', '1200-06-18'),
    ('dentist101', 'loic@dbms.com', '1500-06-18'),
    ('dentist102', 'dalia@dbms.com', '1700-06-18'),
    ('dentist103', 'zach@dbms.com', '1999-06-18');

-- ssn, username, firstName, middleName, lastName, gender, dateOfBirth, email, phoneNumber
INSERT INTO Person
VALUES
    (111111111, 'admin', 'Super', null, 'Admin', 'Female', '1990-01-20', 'sadm@gmail.com', '613111111'),
    (111111112, 'patient101', 'John', null, 'Smith', 'Male', '1980-01-20', 'jsm@gmail.com', '6134223690'),
    (111111113, 'patient102', 'Jean', 'Loic', 'Kan', 'Male', '1970-01-20', 'jlk@gmail.com', '613111111'),
    (111111114, 'patient102', 'Dla', null, 'Swa', 'Female', '1960-03-20', 'dsw@gmail.com', '6134223230'),
    (111111115, 'patient103', 'Zkl', null, 'Admin', 'Male', '1950-04-20', 'zkl@gmail.com', '6133453629'),
    (111111116, 'patient104', 'Seb', null, 'Grd', 'Male', '1991-05-20', 'sgd@gmail.com', '6134523690'),
    (111111117, 'dentist101', 'Abl', null, 'Tsf', 'Female', '1992-06-20', 'atsf@gmail.com', '6137223690'),
    (111111118, 'dentist102', 'Pol', null, 'Ogne', 'Female', '1993-07-20', 'pologne@gmail.com', '6138223690'),
    (111111119, 'dentist103', 'Car', null, 'Rie', 'Male', '1994-08-20', 'carrie@gmail.com', '6139223690');

-- Patient id - length: 6
-- patientId, ssn, balance
INSERT INTO Patient
VALUES
    (230000, 111111112, 700.00),
    (230001, 111111113, 0.00),
    (230002, 111111114, 58.50),
    (230003, 111111115, 105.95),
    (230004, 111111116, 0.00);
    

-- Branch id - length: 3
-- branchId, city, managerId
INSERT INTO Branch 
VALUES
    (100, 'Ottawa', null),
    (200, 'Montreal', null),
    (300, 'Vancouver', null),
    (400, 'Toronto', null),
    (500, 'Waterloo', null),
    (600, 'Gatineau', null);
  

-- Employee id - length: 5
-- employeeId, ssn, salary, empRole, empType, branchId
INSERT INTO Employee
VALUES
    (60000, 111111117, 55.00, 'Dentist', 'Full-time', 100),
    (60001, 111111118, 50.00, 'Dentist', 'Part-time', 500),
    (60002, 111111119, 50.00, 'Dentist', 'Part-time', 600);


-- Invoice id - length: 7
-- invoiceID, issueDate, patientCharge, insurCharge, totalFee, discount, penalty
INSERT INTO Invoice
VALUES
    (1111111, '2022-01-01 03:12:01', 100.00, 50.00, 185.00, 15.00, 50.00),
    (2222222, '2021-09-07 11:31:14', 200.00, 100.00, 290.00, 10.00, 0.00),
    (3333333, '2019-08-08 10:14:01', 300.00, 20.00, 323.00, 22.00, 25.00),
    (4444444, '2012-03-29 03:12:01', 50.00, 30.00, 75.00, 25.00, 30.00),
    (5555555, '2018-12-31 23:59:59', 500.00, 90.00, 625.00, 15.00, 50.00),
    (6666666, '2020-01-01 11:11:11', 400.00, 50.00, 435.00, 15.00, 0.00);


-- Appointment id - length: 7
-- appointmentID, patientID, EmployeeID, date, startTime, endTime, appointmentType, status, room, invoiceID
INSERT INTO Appointment
VALUES 
    (5500000, 230000, 60000, '2022-03-04', '02:00:00', '03:00:00', 'Cleaning', 'Confirmed', 1, 1111111), 
    (5500001, 230001, 60000, '2022-03-04', '03:00:00', '04:00:00', 'Cleaning', 'Cancelled', 1, 2222222), 
    (5500002, 230002, 60000, '2022-03-04', '04:00:00', '05:00:00', 'Braces Checkup', 'Confirmed', 1, 3333333), 
    (5500003, 230003, 60001, '2022-03-04', '05:00:00', '06:00:00', 'Cleaning', 'Confirmed', 2, 4444444), 
    (5500004, 230004, 60002, '2022-02-04', '06:00:00', '07:00:00', 'Wisdom Teeth Removal', 'Completed', 3, 5555555);


-- procedure id - length: 5, procedure code: 3, appointment id: 7, feeCode: 2
-- procedureId, appointId, procedureCode, feeCode, procType, procDescription, toothInvolved, amountOfProcedure, feeCharge
INSERT INTO AppointmentProcedure
VALUES
    (11111, 5500000, 300, 11, 'Unknown procedure type', 'Description', 'C4', 3, 100.00),
    (22222, 5500001, 300, 11, 'Unknown procedure type', 'Description', 'M1', 3, 75.00),
    (33333, 5500002, 300, 11, 'Unknown procedure type', 'Description', 'T24', 3, 200.00),
    (44444, 5500003, 300, 11, 'Unknown procedure type', 'Description', 'B2', 3, 50.00);

-- treatment id - length: 4
-- treatmentId, appointId, treatType, medication, symptoms, tooth, comments, cost, note
INSERT INTO Treatment(treatmentId, appointId, treatType, medication, symptoms, tooth, comments, cost, note)
VALUES
    (9091, 5500000, 'Teeth Whitening', 'drugs', 'Unknown Symptoms', 'C3', 'yall are awesome', 1000.00, 'Project end of treatment: never'),
    (9094, 5500002, 'Unknown treatment type', 'pot', 'Unknown Symptoms', 'C4', 'yall are awesome', 1000.00, 'Project end of treatment: never ever'),
    (9096, 5500004, 'Teeth removal', 'water', 'Unknown Symptoms', 'C2', 'yall are awesome', 1000.00, 'Project end of treatment: never ever brother');

-- payment id - length: 7
-- paymentId, patientCharge, insurCharge, totalAmount, paymentType, invoiceId
INSERT INTO Payment
VALUES
    (5001111, 300.00, 50.00, 350.00, 'Visa', 1111111),
    (5002222, 200.00, 100.00, 300.00, 'Debit', 2222222),
    (5003333, 100.00, 20.00, 120.00, 'Mastercard', 3333333);

-- review id - length: 5
-- reviewId, branchId, professionalism, communication, cleanliness, serviceValue, patientId
INSERT INTO Review 
VALUES 
    (90000, 100, 3, 2, 4, 3, 230000),
    (90001, 300, 5, 5, 4, 5, 230001),
    (90002, 500, 1, 2, 1, 1, 230002);

-- claim id - length: 5
-- claimId, paymentId
INSERT INTO InsuranceClaim
VALUES
    (90011, 5001111),
    (90022, 5002222),
    (90033, 5003333);