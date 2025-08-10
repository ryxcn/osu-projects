# pip install Faker

import csv
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

# medical staff specialties 
medicalStaffSpecialties = ['EMT', 'nurse', 'doctor', 'radiologist']

def generatePatientIDs(numPatients):
    return [fake.uuid4() for _ in range(numPatients)]

def generateStaffIDs(numStaff):
    return [fake.uuid4() for _ in range(numStaff)]
    
def generateData(numPatients, numStaff, filename):
    patientIDs = generatePatientIDs(numPatients)
    staffIDs = generateStaffIDs(numStaff)

    # dictionary to store patient IDs
    dictPatientID = {staffID: [] for staffID in staffIDs}

    # create and open csv file
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)

        # patient data
        for patientID in patientIDs:
            writer.writerow(['patientID', 'name', 'DOB', 'transportTime', 'doctorID'])
            name = fake.name()
            dob = fake.date_of_birth(minimum_age=0, maximum_age=100)
            transportTime = fake.date_time_this_decade()
            staffID = random.choice(staffIDs)

            # write patient data to file
            writer.writerow([patientID, name, dob, transportTime, staffID])

            # update patient IDs
            dictPatientID[staffID].append(patientID)

            # vital sign data
            writer.writerow(['dataID', 'transmitTime', 'systolicBP', 'diastolicBP', 'heartRate', 'temperature', 'respirationRate', 'bloodOxygen', 'patientID'])
            for i in range(20):
                vitalSignID = fake.uuid4()
                transmitTime = transportTime + timedelta(seconds=30 * i)
                systolicBP = random.randint(40, 200)
                diastolicBP = systolicBP - random.randint(20, 90)
                if diastolicBP < 0:
                    diastolicBP = 0
                heartRate = random.randint(40, 200)
                temperature = (round((((random.uniform(35.0, 40.0)) * 9/5) + 32), 1))
                respirationRate = random.randint(8, 40)
                bloodOxygen = random.randint(60, 110)

                # write vital sign data to file
                writer.writerow([vitalSignID, transmitTime, systolicBP, diastolicBP, heartRate, temperature, respirationRate, bloodOxygen, patientID])

        # medical staff data
        writer.writerow(['staffID', 'name', 'specialty', 'patientIDs'])
        for staffID in staffIDs:
            name = fake.name()
            specialty = random.choice(medicalStaffSpecialties)
            dictPatientIDs = dictPatientID[staffID]

            # write medical staff data to file
            writer.writerow([staffID, name, specialty, dictPatientIDs])

    print(f"patient, medical staff, and vital sign data was saved to {filename}")

# specify the output file name, number of patients, and number of staff
outputFile = 'patient_data.csv'
numPatients = 10
numStaff = 5

# generate and save mock data
generateData(numPatients, numStaff, outputFile)